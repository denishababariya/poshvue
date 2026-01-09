const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);
const { Product, Category } = require('../model');

function mapAdminToProduct(payload) {
  const body = { ...payload };
  // Map name -> title
  if (body.name && !body.title) body.title = body.name;
  // Status -> active
  if (typeof body.status === 'string') {
    body.active = body.status !== 'Inactive';
  }
  // Compute salePrice if discountPercent provided
  if (typeof body.price === 'number') {
    const discount = typeof body.discountPercent === 'number' ? body.discountPercent : 0;
    body.salePrice = typeof body.salePrice === 'number' ? body.salePrice : Number((body.price - body.price * (discount / 100)).toFixed(2));
  }
  // Ensure images are strings (ignore File objects without upload)
  if (Array.isArray(body.images)) {
    body.images = body.images.filter((img) => typeof img === 'string');
  }
  // Colors already matches schema [{name,hex}] if provided
  return body;
}

// New helper: save base64 image to uploads/products and return public path
async function saveBase64Image(dataUrl) {
  const match = /^data:(image\/[a-zA-Z]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error('Invalid image data');
  const mime = match[1]; // e.g. image/jpeg
  let ext = mime.split('/')[1];
  if (ext === 'jpeg') ext = 'jpg';
  const base64 = match[2];
  const buffer = Buffer.from(base64, 'base64');

  const MAX_BYTES = 5 * 1024 * 1024; // 5 MB limit
  if (buffer.length > MAX_BYTES) throw new Error('Image too large');

  const uploadDir = path.join(__dirname, '..', 'uploads', 'products');
  await mkdir(uploadDir, { recursive: true });

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  // Return public URL (ensure express serves /uploads)
  return `/uploads/products/${filename}`;
}

async function processImagesArray(images) {
  if (!Array.isArray(images)) return images;
  const out = [];
  for (const img of images) {
    try {
      if (typeof img === 'string' && img.startsWith('data:')) {
        const saved = await saveBase64Image(img);
        out.push(saved);
      } else if (typeof img === 'string') {
        out.push(img); // already a URL/path
      }
    } catch (err) {
      // skip bad images silently (or log)
      console.error('Image processing error:', err.message);
    }
  }
  return out;
}

// New helper: convert stored /uploads/... paths to absolute URLs using request host
function makeAbsoluteImages(images, req) {
  if (!Array.isArray(images)) return images;
  const host = `${req.protocol}://${req.get('host')}`;
  return images.map((img) => {
    if (typeof img === 'string' && img.startsWith('/uploads/')) {
      return host + img;
    }
    return img;
  });
}

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, sort = '-createdAt', category } = req.query;
    const query = {};

    if (q) query.title = { $regex: q, $options: 'i' };
    if (category) query.categories = { $in: [category] };

    const [items, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .populate('categories'),
      Product.countDocuments(query),
    ]);

    // convert images to absolute URLs
    const itemsOut = items.map((it) => {
      const obj = it.toObject ? it.toObject() : it;
      obj.images = makeAbsoluteImages(obj.images, req);
      return obj;
    });

    return res.json({ items: itemsOut, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.get = async (req, res) => {
  try {
    console.log('Fetching product with ID:', req.params.id);
    const item = await Product.findById(req.params.id).populate('categories');
    if (!item) return res.status(404).json({ message: 'Not found' });
    const obj = item.toObject ? item.toObject() : item;
    obj.images = makeAbsoluteImages(obj.images, req);
    return res.json({ item: obj });
  } catch (err) {
    console.log('Error fetching product:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

async function resolveCategory(body) {
  if (body.category && !body.categories) {
    const found = await Category.findOne({ name: body.category });
    if (found) body.categories = [found._id];
    delete body.category;
  }
}

exports.create = async (req, res) => {
  try {
    const body = mapAdminToProduct(req.body);
    // process base64 images -> file URLs
    if (Array.isArray(body.images)) {
      body.images = await processImagesArray(body.images);
    }
    await resolveCategory(body);
    const item = await Product.create(body);
    const populated = await Product.findById(item._id).populate('categories');
    const obj = populated.toObject ? populated.toObject() : populated;
    obj.images = makeAbsoluteImages(obj.images, req);
    return res.status(201).json({ item: obj });
  } catch (err) {
    console.error('Create product error:', err.message || err);
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.update = async (req, res) => {
  try {
    const body = mapAdminToProduct(req.body);
    await resolveCategory(body);

    // load existing to remove any deleted local files
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Not found' });

    // process incoming images (save base64)
    if (Array.isArray(body.images)) {
      body.images = await processImagesArray(body.images);
    }

    const item = await Product.findByIdAndUpdate(req.params.id, body, { new: true }).populate('categories');

    // delete old local files that were removed in update
    try {
      const oldImages = Array.isArray(existing.images) ? existing.images : [];
      const newImages = Array.isArray(body.images) ? body.images : [];
      const uploadPrefix = '/uploads/products/';
      for (const img of oldImages) {
        if (typeof img === 'string' && img.startsWith(uploadPrefix) && !newImages.includes(img)) {
          const fileOnDisk = path.join(__dirname, '..', img); // img starts with /uploads/...
          // ensure path is inside uploads/products
          if (fileOnDisk.startsWith(path.join(__dirname, '..', 'uploads', 'products'))) {
            try { await unlink(fileOnDisk); } catch (e) { /* ignore missing */ }
          }
        }
      }
    } catch (cleanupErr) {
      console.error('Cleanup images error:', cleanupErr.message || cleanupErr);
    }

    if (!item) return res.status(404).json({ message: 'Not found' });
    const obj = item.toObject ? item.toObject() : item;
    obj.images = makeAbsoluteImages(obj.images, req);
    return res.json({ item: obj });
  } catch (err) {
    console.error('Update product error:', err.message || err);
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
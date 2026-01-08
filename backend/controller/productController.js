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

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, sort = '-createdAt', category } = req.query;
    const query = {};
    if (q) query.title = { $regex: q, $options: 'i' };
    if (category) query.categories = category;

    const [items, total] = await Promise.all([
      Product.find(query).sort(sort).skip((page - 1) * limit).limit(Number(limit)).populate('categories'),
      Product.countDocuments(query),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id).populate('categories');
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
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
    await resolveCategory(body);
    const item = await Product.create(body);
    const populated = await Product.findById(item._id).populate('categories');
    return res.status(201).json({ item: populated });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.update = async (req, res) => {
  try {
    const body = mapAdminToProduct(req.body);
    await resolveCategory(body);
    const item = await Product.findByIdAndUpdate(req.params.id, body, { new: true }).populate('categories');
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
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
const { Category } = require('../model');

function mapAdminToCategory(payload) {
  const body = { ...payload };
  // Map status -> active
  if (typeof body.status === 'string') {
    body.active = body.status === 'Active';
    delete body.status;
  }
  return body;
}

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 50, q, sort = 'name' } = req.query;
    const query = {};
    if (q) query.name = { $regex: q, $options: 'i' };
    const [items, total] = await Promise.all([
      Category.find(query).sort(sort).skip((page - 1) * limit).limit(Number(limit)),
      Category.countDocuments(query),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const item = await Category.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const body = mapAdminToCategory(req.body);
    // slug from name if not provided
    if (body.name && !body.slug) body.slug = body.name.toLowerCase().replace(/\s+/g, '-');
    const item = await Category.create(body);
    return res.status(201).json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.update = async (req, res) => {
  try {
    const body = mapAdminToCategory(req.body);
    if (body.name && !body.slug) body.slug = body.name.toLowerCase().replace(/\s+/g, '-');
    const item = await Category.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Category.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
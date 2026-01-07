const { Blog } = require('../model');

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function mapAdminToBlog(payload) {
  const body = { ...payload };
  // Accept content as array of { head, body } and map to sections
  if (Array.isArray(body.content)) {
    const blocks = body.content
      .filter(b => b && (b.head || b.heading || b.body))
      .map(b => ({ heading: b.head || b.heading || '', body: b.body || '' }));
    body.sections = blocks;
    delete body.content;
  }
  // Ensure sections supports incoming { head, body } or { heading, body }
  if (Array.isArray(body.sections)) {
    body.sections = body.sections
      .filter(s => s && (s.head || s.heading || s.body))
      .map(s => ({ heading: s.head || s.heading || '', body: s.body || '' }));
  }
  if (Array.isArray(body.tips)) {
    body.tips = body.tips.filter(t => typeof t === 'string' && t.trim().length);
  }
  if (Array.isArray(body.images)) {
    body.images = body.images.filter(u => typeof u === 'string' && u.trim().length);
  }
  // Derive slug from title if missing
  if (body.title && !body.slug) body.slug = slugify(body.title);
  return body;
}

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 10, q, tag, sort = '-createdAt' } = req.query;
    const query = {};
    if (q) query.title = { $regex: q, $options: 'i' };
    if (tag) query.tags = tag;

    const [items, total] = await Promise.all([
      Blog.find(query).sort(sort).skip((page - 1) * limit).limit(Number(limit)),
      Blog.countDocuments(query),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const item = await Blog.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const body = mapAdminToBlog(req.body);
    const item = await Blog.create(body);
    return res.status(201).json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.update = async (req, res) => {
  try {
    const body = mapAdminToBlog(req.body);
    const item = await Blog.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Blog.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
const { Review } = require('../model');

function mapAdminToReview(payload) {
  const body = { ...payload };
  // star -> rating (Number)
  if (body.star !== undefined) {
    const r = Number(body.star);
    if (!Number.isNaN(r)) body.rating = r;
    delete body.star;
  }
  // msg -> comment (String)
  if (body.msg !== undefined) {
    body.comment = String(body.msg);
    delete body.msg;
  }
  // image stays as image (String) if provided
  if (body.image !== undefined && typeof body.image !== 'string') {
    delete body.image;
  }
  return body;
}

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, product, status } = req.query;
    const query = {};
    if (product) query.product = product;
    if (status) query.status = status;

    const [items, total] = await Promise.all([
      Review.find(query).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit)),
      Review.countDocuments(query),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const body = mapAdminToReview(req.body);
    const item = await Review.create(body);
    return res.status(201).json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid status' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Review.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
const { Subscription } = require('../model');

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const [items, total] = await Promise.all([
      Subscription.find({}).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit)),
      Subscription.countDocuments({}),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.subscribe = async (req, res) => {
  try {
    const exists = await Subscription.findOne({ email: req.body.email });
    if (exists) return res.status(200).json({ item: exists, message: 'Already subscribed' });
    const item = await Subscription.create(req.body);
    return res.status(201).json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Subscription.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
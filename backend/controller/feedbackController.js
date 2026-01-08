const Feedback = require('../model/Feedback'); // updated import

// List Feedbacks
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query;
    const query = {};
    if (type) query.type = type;

    const [items, total] = await Promise.all([
      Feedback.find(query).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit)),
      Feedback.countDocuments(query),
    ]);

    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Create Feedback
exports.create = async (req, res) => {
  try {
    const { name, email, type, message, rating } = req.body;

    // Optional: validate email format here if needed

    const item = await Feedback.create({ name, email, type, message, rating });
    return res.status(201).json({ item });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid data' });
  }
};

// Delete Feedback
exports.remove = async (req, res) => {
  try {
    const item = await Feedback.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

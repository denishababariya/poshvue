const { ContactPage } = require('../model');

exports.get = async (req, res) => {
  try {
    const page = await ContactPage.findOne();
    if (!page) return res.status(404).json({ message: 'Contact page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const page = await ContactPage.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

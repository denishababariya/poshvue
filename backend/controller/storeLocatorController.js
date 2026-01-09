const { StoreLocator } = require('../model');

exports.get = async (req, res) => {
  try {
    const storeLocator = await StoreLocator.findOne();
    if (!storeLocator) return res.status(404).json({ message: 'Store locator not found' });
    res.json(storeLocator);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const storeLocator = await StoreLocator.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(storeLocator);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

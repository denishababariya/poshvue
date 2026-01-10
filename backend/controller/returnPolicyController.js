const { ReturnPolicy } = require('../model');

exports.getReturnPolicy = async (req, res) => {
  try {
    const returnPolicy = await ReturnPolicy.findOne();
    if (!returnPolicy) {
      return res.status(404).json({ message: 'Return Policy not found' });
    }
    res.json(returnPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReturnPolicy = async (req, res) => {
  try {
    const returnPolicy = await ReturnPolicy.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(returnPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
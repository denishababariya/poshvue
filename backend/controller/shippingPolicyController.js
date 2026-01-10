const { ShippingPolicy } = require('../model');

exports.getShippingPolicy = async (req, res) => {
  try {
    const shippingPolicy = await ShippingPolicy.findOne();
    if (!shippingPolicy) {
      return res.status(404).json({ message: 'Shipping Policy not found' });
    }
    res.json(shippingPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateShippingPolicy = async (req, res) => {
  try {
    const shippingPolicy = await ShippingPolicy.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(shippingPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
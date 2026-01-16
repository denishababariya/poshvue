const { Order } = require('../model');
const { createShipmentForOrder } = require('../services/shiprocket');

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, sort = '-createdAt' } = req.query;
    const query = {};
    if (status) query.status = status;

    const [items, total] = await Promise.all([
      Order.find(query).sort(sort).skip((page - 1) * limit).limit(Number(limit)),
      Order.countDocuments(query),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const item = await Order.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      user: req.user?.id || req.body.user,
    };

    const item = await Order.create(payload);

    // Try to create a Shiprocket shipment in the background
    try {
      const shippingData = await createShipmentForOrder(item);
      if (shippingData) {
        item.shippingData = shippingData;
        await item.save();
      }
    } catch (shipErr) {
      console.error('Failed to create Shiprocket shipment:', shipErr);
    }

    return res.status(201).json({ item });
  } catch (err) {
    console.error('Order create error:', err);
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid status' });
  }
};
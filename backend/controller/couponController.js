const { Coupon } = require('../model');

function mapAdminToCoupon(payload) {
  const body = { ...payload };
  // type (Percentage/Fixed) -> discountType ('percentage'|'fixed')
  if (body.type !== undefined) {
    const t = String(body.type).trim().toLowerCase();
    body.discountType = t === 'percent' ? 'percent' : 'fixed';
    delete body.type;
  }
  // discount -> amount (number)
  if (body.discount !== undefined) {
    const amt = Number(body.discount);
    if (!Number.isNaN(amt)) body.amount = amt;
    delete body.discount;
  }
  // expiryDate -> endDate (Date)
  if (body.expiryDate !== undefined) {
    const d = new Date(body.expiryDate);
    if (!Number.isNaN(d.getTime())) body.endDate = d;
    delete body.expiryDate;
  }
  // status -> active (boolean)
  if (typeof body.status === 'string') {
    body.active = body.status === 'Active';
    delete body.status;
  }
  // normalize maxUses to number if provided
  if (body.maxUses !== undefined) {
    const m = Number(body.maxUses);
    if (!Number.isNaN(m)) body.maxUses = m; else delete body.maxUses;
  }
  // trim code if provided
  if (typeof body.code === 'string') {
    body.code = body.code.trim();
  }
  return body;
}

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, active } = req.query;
    const query = {};
    if (active !== undefined) query.active = active === 'true';

    const [items, total] = await Promise.all([
      Coupon.find(query).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit)),
      Coupon.countDocuments(query),
    ]);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const item = await Coupon.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const body = mapAdminToCoupon(req.body);
    const item = await Coupon.create(body);
    return res.status(201).json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.update = async (req, res) => {
  try {
    const body = mapAdminToCoupon(req.body);
    const item = await Coupon.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid data' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Coupon.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const { Address } = require('../model');

/* ================= CREATE ADDRESS ================= */
exports.createAddress = async (req, res) => {
  try {
    const address = await Address.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= GET USER ADDRESSES ================= */
exports.getAddresses = async (req, res) => {
  try {
    console.log("GET /address for user:", req.user && req.user.id);
    const addresses = await Address.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    console.log("Found addresses count:", addresses.length);
    // Disable caching so client always gets fresh data and avoids 304 issues
    res.set('Cache-Control', 'no-store');
    res.status(200).json(addresses);
  } catch (err) {
    console.error("Error in getAddresses:", err);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};

/* ================= UPDATE ADDRESS ================= */
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!address)
      return res.status(404).json({ message: "Address not found" });

    res.json(address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= DELETE ADDRESS ================= */
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!address)
      return res.status(404).json({ message: "Address not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete address" });
  }
};

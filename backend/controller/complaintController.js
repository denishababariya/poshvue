const { Complaint, Order } = require("../model");
const mongoose = require("mongoose");

/* ===========================
   LIST COMPLAINTS
=========================== */
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, complaintType } = req.query;

    const query = {};
    if (status) query.status = status;
    if (complaintType) query.complaintType = complaintType;

    const [items, total] = await Promise.all([
      Complaint.find(query)
        .populate("orderNumber") // ✅ ORDER DATA
        .populate("user", "name email") // optional
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),

      Complaint.countDocuments(query),
    ]);

    return res.json({
      items,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ===========================
   CREATE COMPLAINT
=========================== */
exports.create = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      orderNumber, // 👈 Order _id
      subject,
      complaintType,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !orderNumber ||
      !subject ||
      !complaintType ||
      !message
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderNumber)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    // ✅ Check order exists
    const orderExists = await Order.findById(orderNumber);
    if (!orderExists) {
      return res.status(404).json({ message: "Order not found" });
    }

    const item = await Complaint.create({
      user: req.user?._id || null,
      name,
      email,
      mobile,
      orderNumber,
      subject,
      complaintType,
      message,
    });

    // ✅ populate response
    const populatedItem = await item.populate("orderNumber");

    return res.status(201).json({ item: populatedItem });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid data" });
  }
};

/* ===========================
   UPDATE STATUS
=========================== */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["open", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const item = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("orderNumber");

    if (!item) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.json({ item });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid request" });
  }
};

const mongoose = require("mongoose");
const { Order } = require("../model");
const {
  createShipmentForOrder,
  updateOrderWithShipmentData,
  getShipmentTracking,
  getOrderByShiprocketId,
} = require("../services/shiprocket");

/**
 * =====================================
 * GET ORDERS (Admin + User wise)
 * =====================================
 */
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, sort = "-createdAt", userId } = req.query;
    const query = {};

    if (req.user?.role !== "admin") query.user = req.user.id;
    if (req.user?.role === "admin" && userId) query.user = userId;
    if (status) query.status = status;

    const [items, total] = await Promise.all([
      Order.find(query)
        .populate("user", "name email phone")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Order.countDocuments(query),
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error("Order list error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * =====================================
 * GET SINGLE USER ORDERS
 * =====================================
 */
exports.get = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate("user", "name email")
      .populate({ path: "items.product", select: "name salePrice" })
      .sort("-createdAt");

    if (!orders.length) return res.status(404).json({ message: "Order not found" });

    const formattedOrders = orders.map((order) => {
      const obj = order.toObject();
      obj.items = obj.items.map((item) => ({
        ...item,
        productName: item.product?.name,
      }));
      return obj;
    });

    res.json({ item: formattedOrders });
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * =====================================
 * CREATE ORDER
 * =====================================
 */
exports.create = async (req, res) => {
  try {
    const { items, user } = req.body;

    if (!items || !items.length)
      return res.status(400).json({ message: "Order must have items" });

    const normalizedItems = items.map((i) => ({
      name: i.name || i.title,
      qty: i.qty || i.quantity,
      price: i.price,
      discount: i.discount || 0,
      tax: i.tax || 0,
      product: i.product,
      size: i.size,
      color: i.color,
    }));

    const payload = {
      ...req.body,
      items: normalizedItems,
      user: req.user?.id || user,
      status: req.body.status || "pending",
      paymentStatus: req.body.paymentStatus || "pending",
      paymentMethod: req.body.paymentMethod || "card",
      order_date: req.body.order_date || new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    payload.subTotal =
      payload.subTotal ||
      normalizedItems.reduce((s, i) => s + i.price * i.qty, 0);

    payload.total = payload.total || payload.subTotal;

    const item = await Order.create(payload);

    if (item.paymentStatus === "completed" || item.status === "paid") {
      try {
        const shipData = await createShipmentForOrder(item);
        if (shipData) {
          await updateOrderWithShipmentData(item, shipData);
          await item.save();
        }
      } catch (e) {
        console.error("Shiprocket error:", e.message);
      }
    }

    res.status(201).json({ item });
  } catch (err) {
    console.error("Order create error:", err);
    res.status(400).json({ message: err.message });
  }
};

/**
 * =====================================
 * UPDATE ORDER STATUS
 * =====================================
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const item = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!item) return res.status(404).json({ message: "Order not found" });

    if (status === "shipped" && !item.shipmentId && item.paymentStatus === "completed") {
      try {
        const shipData = await createShipmentForOrder(item);
        if (shipData) {
          await updateOrderWithShipmentData(item, shipData);
          await item.save();
        }
      } catch (e) {
        console.error("Shiprocket error:", e.message);
      }
    }

    res.json({ item });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(400).json({ message: "Invalid status" });
  }
};

/**
 * =====================================
 * GET ORDERS BY USER (ADMIN)
 * =====================================
 */
exports.getOrdersByUser = async (req, res) => {
  try {
    const items = await Order.find({ user: req.params.userId })
      .populate("user", "name email")
      .sort("-createdAt");

    res.json({ items });
  } catch (err) {
    console.error("User orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * =====================================
 * TRACK ORDER (SAFE)
 * =====================================
 */
exports.trackOrder = async (req, res) => {
  try {
    const { orderId, email } = req.body;
    if (!orderId) return res.status(400).json({ message: "Order ID required" });

    let order = null;

    // full ObjectId
    if (mongoose.Types.ObjectId.isValid(orderId)) {
      order = await Order.findById(orderId)
        .populate("user", "name email phone")
        .populate({ path: "items.product", select: "title images salePrice price" });
    }

    // partial ID
    if (!order) {
      order = await Order.findOne({
        $expr: {
          $regexMatch: {
            input: { $toString: "$_id" },
            regex: orderId,
            options: "i",
          },
        },
      })
        .populate("user", "name email phone")
        .populate({ path: "items.product", select: "title images salePrice price" });
    }

    if (!order) return res.status(404).json({ message: "Order not found" });

    const customerEmail = order.shippingInfo?.email || order.customerEmail;
    if (email && customerEmail?.toLowerCase() !== email.toLowerCase())
      return res.status(403).json({ message: "Email mismatch" });

    let trackingInfo = null;
    if (order.shipmentId) {
      try {
        trackingInfo = await getShipmentTracking(order.shipmentId);
      } catch (e) {
        console.error("Tracking error:", e.message);
      }
    }

    const statusMap = {
      pending: { step: 0, label: "Order Placed" },
      paid: { step: 1, label: "Payment Confirmed" },
      processing: { step: 2, label: "Processing" },
      shipped: { step: 3, label: "Shipped" },
      out_for_delivery: { step: 4, label: "Out for Delivery" },
      delivered: { step: 5, label: "Delivered" },
      cancelled: { step: -1, label: "Cancelled" },
      cancle: { step: -1, label: "Cancelled" },
    };

    const current = statusMap[order.status] || statusMap.pending;

    res.json({
      order: {
        _id: order._id,
        orderNumber: order._id.toString().slice(-8).toUpperCase(),
        status: order.status,
        statusLabel: current.label,
        currentStep: current.step,
        customerName: order.shippingInfo?.firstName || order.customerName,
        customerEmail,
        customerPhone: order.shippingInfo?.phone || order.customerPhone,
        address: order.shippingInfo?.address || order.address,
        shippingInfo: order.shippingInfo,
        total: order.subTotal || order.total,
        items: order.items,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        trackingNumber: order.shipmentId || order.trackingNumber,
        trackingUrl: order.trackingUrl,
        shipmentDetail: order.shipmentDetail,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
      trackingInfo,
    });
  } catch (err) {
    console.error("Track order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

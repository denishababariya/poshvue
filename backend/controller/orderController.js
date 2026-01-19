const { Order } = require("../model");
const { createShipmentForOrder } = require("../services/shiprocket");

/**
 * =====================================
 * GET ORDERS (Admin + User wise)
 * =====================================
 * Admin  → can pass userId in query
 * User   → gets only own orders (req.user.id)
 */
exports.list = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      sort = "-createdAt",
      userId,
    } = req.query;

    const query = {};

    // ✅ User panel → logged in user orders
    if (req.user?.role !== "admin") {
      query.user = req.user.id;
    }

    // ✅ Admin panel → userId wise orders
    if (req.user?.role === "admin" && userId) {
      query.user = userId;
    }

    if (status) {
      query.status = status;
    }

    const [items, total] = await Promise.all([
      Order.find(query)
        .populate("user", "name email phone") // Populate user with name, email, phone
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Order.countDocuments(query),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error("Order list error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * =====================================
 * GET SINGLE ORDER
 * =====================================
 */
exports.get = async (req, res) => {
  try {
    console.log(req.params.id, "userid");

    const orders = await Order.find({ user: req.params.id })
      .populate("user", "name email")
      .populate({
        path: "items.product",
        select: "name salePrice", // 👈 salePrice populate
      })
      .sort("-createdAt");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔁 Replace price with salePrice
    const formattedOrders = orders.map((order) => {
      const orderObj = order.toObject();

      orderObj.items = orderObj.items.map((item) => ({
        ...item,
        price: item.product?.salePrice || item.price, // 👈 salePrice used
        productName: item.product?.name,
      }));

      return orderObj;
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
    const payload = {
      ...req.body,
      user: req.user?.id || req.body.user,
    };

    const item = await Order.create(payload);

    // 🚚 Shiprocket (background)
    try {
      const shippingData = await createShipmentForOrder(item);
      if (shippingData) {
        item.shippingData = shippingData;
        await item.save();
      }
    } catch (shipErr) {
      console.error("Shiprocket error:", shipErr.message);
    }

    res.status(201).json({ item });
  } catch (err) {
    console.error("Order create error:", err);
    res.status(400).json({ message: "Invalid order data" });
  }
};

/**
 * =====================================
 * UPDATE ORDER STATUS (Admin only)
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

    if (!item) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ item });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(400).json({ message: "Invalid status" });
  }
};

/**
 * =====================================
 * GET ORDERS BY USER ID (Admin shortcut)
 * =====================================
 */
exports.getOrdersByUser = async (req, res) => {
  console.log('fdg')
  try {
    const userId = req.params.userId;
    console.log(userId,'userId')

    const items = await Order.find({ user: userId })
      .populate("user", "name email")
      .sort("-createdAt");

    res.json({ items });
  } catch (err) {
    console.error("User orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

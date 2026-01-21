const { Order } = require("../model");
const { 
  createShipmentForOrder,
  updateOrderWithShipmentData,
  getShipmentTracking, 
  getOrderByShiprocketId 
} = require("../services/shiprocket");

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
        .populate("user", "name email phone")
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
        select: "name salePrice",
      })
      .sort("-createdAt");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const formattedOrders = orders.map((order) => {
      const orderObj = order.toObject();

      orderObj.items = orderObj.items.map((item) => ({
        ...item,
        price: item.price,
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
    // Log incoming request for debugging
    console.log('Order creation request:', JSON.stringify(req.body, null, 2));

    // Validate required fields
    const { items, user } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        message: "Order must have at least one item",
        error: "Invalid items array"
      });
    }

    // Support both new format (items with qty) and old format (items with quantity)
    const normalizedItems = items.map(item => ({
      name: item.name || item.title,
      qty: item.qty || item.quantity,
      price: item.price,
      discount: item.discount || 0,
      tax: item.tax || 0,
      product: item.product,
      size: item.size,
      color: item.color,
    }));

    // Build payload with support for both old and new formats
    const payload = {
      ...req.body,
      items: normalizedItems,
      user: req.user?.id || user,
      paymentMethod: req.body.paymentMethod || 'card',
      paymentStatus: req.body.paymentStatus || 'pending',
      status: req.body.status || 'pending',
      // Set order_date in proper format if not provided
      order_date: req.body.order_date || new Date().toISOString().replace('T', ' ').split('.')[0],
    };

    // Calculate totals if not provided
    if (!payload.subTotal && !payload.total) {
      payload.subTotal = normalizedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    } else if (!payload.subTotal && payload.total) {
      payload.subTotal = payload.total;
    }

    if (!payload.total) {
      payload.total = payload.subTotal;
    }

    // Default values for optional but recommended fields
    if (!payload.discount) {
      payload.discount = 0;
    }

    if (!payload.dimension) {
      payload.dimension = {
        length: 10,
        breadth: 10,
        height: 5,
        weight: 0.5,
      };
    }

    console.log('Normalized payload:', JSON.stringify(payload, null, 2));

    const item = await Order.create(payload);

    // 🚚 Shiprocket integration - create shipment if payment is completed
    if (item.paymentStatus === 'completed' || item.status === 'paid') {
      try {
        const shiprocketData = await createShipmentForOrder(item);
        if (shiprocketData) {
          // Update order with Shiprocket data
          await updateOrderWithShipmentData(item, shiprocketData);
          
          // Save the updated order
          await item.save();

          console.log('Order created with Shiprocket shipment:', item._id);
        }
      } catch (shipErr) {
        console.error("Shiprocket error:", shipErr.message);
        // Continue even if Shiprocket fails - order is still valid
      }
    }

    res.status(201).json({ item });
  } catch (err) {
    console.error("Order create error details:", {
      message: err.message,
      name: err.name,
      code: err.code,
      errors: err.errors || err.validationErrors,
      stack: err.stack,
    });

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        message: "Validation error",
        errors: messages,
        details: err.errors,
      });
    }

    // Handle Mongoose cast errors
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        message: "Invalid ID format",
        field: err.path,
      });
    }

    // Generic error response
    res.status(400).json({ 
      message: "Invalid order data",
      error: err.message,
    });
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

    // If status changed to shipped and no shipment yet, try to create shipment
    if (status === 'shipped' && !item.shipmentId && item.paymentStatus === 'completed') {
      try {
        const shiprocketData = await createShipmentForOrder(item);
        if (shiprocketData) {
          await updateOrderWithShipmentData(item, shiprocketData);
          await item.save();
        }
      } catch (shipErr) {
        console.error("Shiprocket error on status update:", shipErr.message);
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
 * GET ORDERS BY USER ID (Admin shortcut)
 * =====================================
 */
exports.getOrdersByUser = async (req, res) => {
  console.log('Getting orders for user:', req.params.userId);
  try {
    const userId = req.params.userId;

    const items = await Order.find({ user: userId })
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
 * TRACK ORDER BY ID OR ORDER NUMBER
 * =====================================
 */
exports.trackOrder = async (req, res) => {
  try {
    const { orderId, email } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Find order by ID (full or partial)
    const order = await Order.findOne({
      $or: [
        { _id: orderId },
        { _id: { $regex: orderId, $options: 'i' } },
      ],
    })
      .populate("user", "name email phone")
      .populate({
        path: "items.product",
        select: "title images salePrice price",
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Verify email if provided
    const customerEmail = order.shippingInfo?.email || order.customerEmail;
    if (email && customerEmail && customerEmail.toLowerCase() !== email.toLowerCase()) {
      return res.status(403).json({ message: "Email does not match order" });
    }

    // Get tracking info from Shiprocket if available
    let trackingInfo = null;
    if (order.shipmentId) {
      try {
        trackingInfo = await getShipmentTracking(order.shipmentId);
      } catch (trackErr) {
        console.error("Error fetching tracking info:", trackErr);
      }
    }

    // Map order status to tracking steps
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

    const currentStatus = statusMap[order.status] || statusMap.pending;

    res.json({
      order: {
        _id: order._id,
        orderNumber: order._id.toString().slice(-8).toUpperCase(),
        status: order.status,
        statusLabel: currentStatus.label,
        currentStep: currentStatus.step,
        customerName: order.shippingInfo?.firstName || order.customerName,
        customerEmail: customerEmail,
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

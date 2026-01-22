const { Order, Product, User, Category } = require('../model');

// Get dashboard statistics
exports.getStats = async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total Orders
    const totalOrders = await Order.countDocuments();
    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $lt: thisMonth, $gte: lastMonth }
    });
    const thisMonthOrders = await Order.countDocuments({
      createdAt: { $gte: thisMonth }
    });
    const orderChange = lastMonthOrders > 0 
      ? ((thisMonthOrders - lastMonthOrders) / lastMonthOrders * 100).toFixed(1)
      : 0;

    // Total Revenue - use total field with fallback to subTotal
    const revenueResult = await Order.aggregate([
      {
        $project: {
          revenue: { $ifNull: ['$total', '$subTotal'] }
        }
      },
      { $group: { _id: null, total: { $sum: '$revenue' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const lastMonthRevenueResult = await Order.aggregate([
      { $match: { createdAt: { $lt: thisMonth, $gte: lastMonth } } },
      {
        $project: {
          revenue: { $ifNull: ['$total', '$subTotal'] }
        }
      },
      { $group: { _id: null, total: { $sum: '$revenue' } } }
    ]);
    const lastMonthRevenue = lastMonthRevenueResult[0]?.total || 0;

    const thisMonthRevenueResult = await Order.aggregate([
      { $match: { createdAt: { $gte: thisMonth } } },
      {
        $project: {
          revenue: { $ifNull: ['$total', '$subTotal'] }
        }
      },
      { $group: { _id: null, total: { $sum: '$revenue' } } }
    ]);
    const thisMonthRevenue = thisMonthRevenueResult[0]?.total || 0;
    const revenueChange = lastMonthRevenue > 0
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
      : 0;

    // Total Products
    const totalProducts = await Product.countDocuments({ active: true });
    const lastMonthProducts = await Product.countDocuments({
      active: true,
      createdAt: { $lt: thisMonth, $gte: lastMonth }
    });
    const thisMonthProducts = await Product.countDocuments({
      active: true,
      createdAt: { $gte: thisMonth }
    });
    const productChange = lastMonthProducts > 0
      ? ((thisMonthProducts - lastMonthProducts) / lastMonthProducts * 100).toFixed(1)
      : 0;

    // Total Users
    const totalUsers = await User.countDocuments({ role: 'user' });
    const lastMonthUsers = await User.countDocuments({
      role: 'user',
      createdAt: { $lt: thisMonth, $gte: lastMonth }
    });
    const thisMonthUsers = await User.countDocuments({
      role: 'user',
      createdAt: { $gte: thisMonth }
    });
    const userChange = lastMonthUsers > 0
      ? ((thisMonthUsers - lastMonthUsers) / lastMonthUsers * 100).toFixed(1)
      : 0;

    return res.json({
      totalOrders,
      totalRevenue: `₹${totalRevenue.toLocaleString('en-IN')}`,
      totalProducts,
      totalUsers,
      orderChange: parseFloat(orderChange),
      revenueChange: parseFloat(revenueChange),
      productChange: parseFloat(productChange),
      userChange: parseFloat(userChange),
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get recent orders
exports.getRecentOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('_id customerName shippingInfo total subTotal status createdAt')
      .lean();

    // Format orders to handle both new and legacy fields
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      customerName: order.shippingInfo?.firstName || order.customerName || 'N/A',
      total: order.total || order.subTotal || 0,
      status: order.status,
      createdAt: order.createdAt
    }));

    return res.json({ items: formattedOrders });
  } catch (err) {
    console.error('Recent orders error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get top products
exports.getTopProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    // Aggregate products from all orders
    const orders = await Order.find().select('items').lean();
    
    const productMap = {};
    
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          // Use name field (new structure) with fallback to title (legacy)
          const productName = item.name || item.title || 'Unknown Product';
          const qty = item.qty || item.quantity || 0;
          
          if (productMap[productName]) {
            productMap[productName].quantity += qty;
          } else {
            productMap[productName] = {
              title: productName,
              price: item.price || 0,
              quantity: qty,
              color: item.color || 'N/A',
              size: item.size || 'N/A',
            };
          }
        });
      }
    });
    
    // Convert to array and sort by quantity (descending)
    const productArray = Object.values(productMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);
    
    return res.json({ items: productArray });
  } catch (err) {
    console.error('Top products error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

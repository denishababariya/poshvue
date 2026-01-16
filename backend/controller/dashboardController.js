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

    // Total Revenue
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const lastMonthRevenueResult = await Order.aggregate([
      { $match: { createdAt: { $lt: thisMonth, $gte: lastMonth } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const lastMonthRevenue = lastMonthRevenueResult[0]?.total || 0;

    const thisMonthRevenueResult = await Order.aggregate([
      { $match: { createdAt: { $gte: thisMonth } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
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
      .select('_id customerName total status createdAt');

    return res.json({ items: orders });
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
    const orders = await Order.find().select('items');
    
    const productMap = {};
    
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const key = item.title;
          if (productMap[key]) {
            productMap[key].quantity += item.quantity || 0;
          } else {
            productMap[key] = {
              title: item.title,
              price: item.price,
              quantity: item.quantity || 0,
              color: item.color,
              size: item.size,
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

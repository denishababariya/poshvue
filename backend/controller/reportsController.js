const { Order, Product, Category, User } = require('../model');

// Get daily sales report
exports.getDailySales = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 5;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get orders grouped by date
    const dailyData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $project: {
          date: '$createdAt',
          revenue: { $ifNull: ['$total', '$subTotal'] },
          items: '$items'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          orders: { $sum: 1 },
          revenue: { $sum: '$revenue' },
          products: { $sum: { $size: '$items' } }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: days
      }
    ]);

    // Get new users per day
    const userDailyData = await User.aggregate([
      {
        $match: {
          role: 'user',
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          users: { $sum: 1 }
        }
      }
    ]);

    // Create a map for users
    const userMap = {};
    userDailyData.forEach(item => {
      userMap[item._id] = item.users;
    });

    // Format the response
    const formattedData = dailyData.map(item => ({
      date: item._id,
      orders: item.orders,
      revenue: `₹${item.revenue.toLocaleString('en-IN')}`,
      products: item.products,
      users: userMap[item._id] || 0
    }));

    return res.json({ items: formattedData });
  } catch (err) {
    console.error('Daily sales error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get category-wise sales report
exports.getCategoryWiseSales = async (req, res) => {
  try {
    console.log('Starting category-wise sales calculation...');
    
    // Get all orders
    const orders = await Order.find().lean();
    console.log(`Found ${orders.length} orders`);

    if (orders.length === 0) {
      return res.json({ items: [] });
    }

    const categoryMap = {};
    let totalSales = 0;
    let totalRevenue = 0;

    // Get all unique product IDs from orders
    const productIdSet = new Set();
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (item.product) {
            // Handle both ObjectId and string formats
            const productId = item.product.toString ? item.product.toString() : String(item.product);
            productIdSet.add(productId);
          }
        });
      }
    });

    const productIds = Array.from(productIdSet);
    console.log(`Found ${productIds.length} unique products`);

    if (productIds.length === 0) {
      return res.json({ items: [] });
    }

    // Fetch all products with their categories (without lean first to ensure populate works)
    const products = await Product.find({ _id: { $in: productIds } })
      .select('categories title')
      .populate('categories', 'name');

    console.log(`Fetched ${products.length} products with categories`);

    // Create a product map for quick lookup
    const productMap = {};
    products.forEach(product => {
      const productId = product._id.toString();
      // Convert to plain object and ensure categories are properly formatted
      const productObj = product.toObject ? product.toObject() : product;
      productMap[productId] = productObj;
    });

    // Process orders and aggregate by category
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          // Handle both ObjectId and string formats
          let productId = item.product;
          if (productId) {
            productId = productId.toString ? productId.toString() : String(productId);
          }
          const product = productMap[productId];
          
          const quantity = Number(item.qty || item.quantity) || 0;
          const price = Number(item.price) || 0;
          const itemRevenue = price * quantity;
          
          // Count total revenue and sales only once per item
          totalSales += quantity;
          totalRevenue += itemRevenue;
          
          if (product && product.categories && Array.isArray(product.categories) && product.categories.length > 0) {
            // Product has categories - distribute revenue across all categories
            // If product has multiple categories, each category gets the full amount
            const validCategories = product.categories.filter(cat => {
              // Filter out null/undefined and ensure we have a valid category
              return cat !== null && cat !== undefined;
            });

            if (validCategories.length > 0) {
              validCategories.forEach(cat => {
                // Handle both populated category object and ObjectId
                let catName = 'Uncategorized';
                if (cat && typeof cat === 'object') {
                  // Category is populated - should have name
                  catName = (cat.name && typeof cat.name === 'string') ? cat.name : 'Uncategorized';
                } else if (cat) {
                  // If it's just an ObjectId string, we can't get the name, skip it
                  console.warn(`Category ${cat} is not populated for product ${productId}`);
                  return;
                }
                
                if (!categoryMap[catName]) {
                  categoryMap[catName] = {
                    category: catName,
                    sales: 0,
                    revenue: 0
                  };
                }
                // Add full quantity and revenue to this category
                categoryMap[catName].sales += quantity;
                categoryMap[catName].revenue += itemRevenue;
              });
            } else {
              // Categories array exists but is empty or invalid
              const catName = 'Uncategorized';
              if (!categoryMap[catName]) {
                categoryMap[catName] = {
                  category: catName,
                  sales: 0,
                  revenue: 0
                };
              }
              categoryMap[catName].sales += quantity;
              categoryMap[catName].revenue += itemRevenue;
            }
          } else {
            // Handle items without categories or products not found
            const catName = 'Uncategorized';
            if (!categoryMap[catName]) {
              categoryMap[catName] = {
                category: catName,
                sales: 0,
                revenue: 0
              };
            }
            categoryMap[catName].sales += quantity;
            categoryMap[catName].revenue += itemRevenue;
          }
        });
      }
    });

    console.log(`Total sales: ${totalSales}, Total revenue: ${totalRevenue}`);
    console.log(`Category map:`, Object.keys(categoryMap));

    // Convert to array and calculate percentages based on actual total revenue
    const categoryArray = Object.values(categoryMap)
      .map(item => {
        // Calculate percentage based on the actual total revenue (not double-counted)
        const percentage = totalRevenue > 0 ? Math.round((item.revenue / totalRevenue) * 100) : 0;
        return {
          category: item.category,
          sales: item.sales,
          revenue: `₹${Math.round(item.revenue).toLocaleString('en-IN')}`,
          percentage: percentage
        };
      })
      .sort((a, b) => {
        // Sort by revenue first, then by sales
        const revenueA = parseFloat(a.revenue.replace(/[₹,]/g, '')) || 0;
        const revenueB = parseFloat(b.revenue.replace(/[₹,]/g, '')) || 0;
        if (revenueB !== revenueA) {
          return revenueB - revenueA;
        }
        return b.sales - a.sales;
      });

    console.log(`Returning ${categoryArray.length} categories`);
    console.log('Category data:', JSON.stringify(categoryArray, null, 2));

    return res.json({ items: categoryArray });
  } catch (err) {
    console.error('Category-wise sales error:', err);
    console.error('Error stack:', err.stack);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get reports statistics
exports.getReportsStats = async (req, res) => {
  try {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total Orders (this month)
    const totalOrders = await Order.countDocuments({
      createdAt: { $gte: thisMonth }
    });

    // Total Sales/Revenue (this month) - use total field with fallback to subTotal
    const revenueResult = await Order.aggregate([
      { $match: { createdAt: { $gte: thisMonth } } },
      {
        $project: {
          revenue: { $ifNull: ['$total', '$subTotal'] }
        }
      },
      { $group: { _id: null, total: { $sum: '$revenue' } } }
    ]);
    const totalSales = revenueResult[0]?.total || 0;

    // New Users (this month)
    const newUsers = await User.countDocuments({
      role: 'user',
      createdAt: { $gte: thisMonth }
    });

    // Top Category (from all orders)
    const orders = await Order.find().lean();
    
    // Get all product IDs
    const productIds = [];
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (item.product) {
            productIds.push(item.product);
          }
        });
      }
    });

    // Fetch products with categories
    const products = await Product.find({ _id: { $in: productIds } })
      .select('categories')
      .populate('categories', 'name')
      .lean();

    const productMap = {};
    products.forEach(product => {
      productMap[product._id.toString()] = product;
    });

    const categoryCount = {};
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const productId = item.product?.toString() || item.product;
          const product = productMap[productId];
          const categories = product?.categories || [];
          if (categories.length > 0) {
            categories.forEach(cat => {
              const catName = cat.name || 'Uncategorized';
              categoryCount[catName] = (categoryCount[catName] || 0) + (item.qty || item.quantity || 0);
            });
          }
        });
      }
    });

    const topCategory = Object.keys(categoryCount).length > 0
      ? Object.keys(categoryCount).reduce((a, b) => 
          categoryCount[a] > categoryCount[b] ? a : b
        )
      : 'N/A';

    return res.json({
      totalOrders,
      TotalSales: `₹${totalSales.toLocaleString('en-IN')}`,
      NewUsers: newUsers,
      Category: topCategory
    });
  } catch (err) {
    console.error('Reports stats error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

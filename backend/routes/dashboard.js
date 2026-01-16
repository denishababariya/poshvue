const express = require('express');
const router = express.Router();
const dashboard = require('../controller/dashboardController');
const { auth, requireRole } = require('../middleware/auth');

// All dashboard routes require admin authentication
router.get('/stats', auth, requireRole('admin'), dashboard.getStats);
router.get('/recent-orders', auth, requireRole('admin'), dashboard.getRecentOrders);
router.get('/top-products', auth, requireRole('admin'), dashboard.getTopProducts);

module.exports = router;

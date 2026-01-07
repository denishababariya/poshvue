const express = require('express');
const router = express.Router();
const order = require('../controller/orderController');
const coupon = require('../controller/couponController');
const { auth, requireRole } = require('../middleware/auth');

// Orders
router.get('/orders', auth, requireRole('admin'), order.list); // admin list
router.get('/orders/:id', auth, order.get); // customer/admin view
router.post('/orders', auth, order.create); // customer create
router.put('/orders/:id/status', auth, requireRole('admin'), order.updateStatus);

// Coupons
router.get('/coupons', auth, requireRole('admin'), coupon.list);
router.get('/coupons/:id', auth, requireRole('admin'), coupon.get);
router.post('/coupons', auth, requireRole('admin'), coupon.create);
router.put('/coupons/:id', auth, requireRole('admin'), coupon.update);
router.delete('/coupons/:id', auth, requireRole('admin'), coupon.remove);

module.exports = router;
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
router.get('/coupons', coupon.list);
router.post('/coupons', auth, requireRole('admin','user'), coupon.create);
router.get('/coupons/:id', coupon.get);
router.put('/coupons/:id', auth, requireRole('admin','user'), coupon.update);
router.delete('/coupons/:id', auth, requireRole('admin','user'), coupon.remove);

module.exports = router;
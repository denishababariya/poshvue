// ...existing code...
const express = require('express');
const router = express.Router();
const couponController = require('../controller/couponController');

// other commerce routes...
router.post('/coupons', couponController.create);
router.get('/coupons', couponController.list);
router.get('/coupons/:id', couponController.get);
router.put('/coupons/:id', couponController.update);
router.delete('/coupons/:id', couponController.remove);

module.exports = router;
// ...existing code...
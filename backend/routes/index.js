const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'));
router.use('/catalog', require('./catalog'));
router.use('/content', require('./content'));
router.use('/commerce', require('./commerce'));
router.use('/support', require('./support'));
// router.use('/coupons', require('./Coupon'));

module.exports = router;
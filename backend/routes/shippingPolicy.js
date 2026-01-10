const express = require('express');
const router = express.Router();
const { shippingPolicyController } = require('../controller');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', shippingPolicyController.getShippingPolicy);
router.put('/', auth, requireRole('admin'), shippingPolicyController.updateShippingPolicy);

module.exports = router;
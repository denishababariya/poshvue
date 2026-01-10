const express = require('express');
const router = express.Router();
const { returnPolicyController } = require('../controller');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', returnPolicyController.getReturnPolicy);
router.put('/', auth, requireRole('admin'), returnPolicyController.updateReturnPolicy);

module.exports = router;
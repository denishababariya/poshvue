const express = require('express');
const router = express.Router();
const { privacyPolicyController } = require('../controller');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', privacyPolicyController.getPrivacyPolicy);
router.put('/', auth, requireRole('admin'), privacyPolicyController.updatePrivacyPolicy);

module.exports = router;
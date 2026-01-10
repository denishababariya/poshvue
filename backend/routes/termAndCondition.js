const express = require('express');
const router = express.Router();
const { termAndConditionController } = require('../controller');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', termAndConditionController.getTermAndCondition);
router.put('/', auth, requireRole('admin'), termAndConditionController.updateTermAndCondition);

module.exports = router;
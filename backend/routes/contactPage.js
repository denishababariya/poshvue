const express = require('express');
const router = express.Router();
const controller = require('../controller/contactPageController');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', controller.get);
router.put('/', auth, requireRole('admin'), controller.update);

module.exports = router;

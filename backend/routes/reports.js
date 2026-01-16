const express = require('express');
const router = express.Router();
const reports = require('../controller/reportsController');
const { auth, requireRole } = require('../middleware/auth');

// All reports routes require admin authentication
router.get('/stats', auth, requireRole('admin'), reports.getReportsStats);
router.get('/daily-sales', auth, requireRole('admin'), reports.getDailySales);
router.get('/category-wise', auth, requireRole('admin'), reports.getCategoryWiseSales);

module.exports = router;

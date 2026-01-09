const express = require('express');
const router = express.Router();
const aboutUsController = require('../controller/aboutUsController');

// GET /api/about-us
router.get('/', aboutUsController.getAboutUs);

// PUT /api/about-us
router.put('/', aboutUsController.updateAboutUs);

module.exports = router;
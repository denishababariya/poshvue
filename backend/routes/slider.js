const express = require('express');
const router = express.Router();
const sliderController = require('../controller/sliderController');

// GET /api/slider
router.get('/', sliderController.getSlider);

// PUT /api/slider
router.put('/', sliderController.updateSlider);

module.exports = router;
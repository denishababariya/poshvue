const express = require('express');
const router = express.Router();
const homePosterController = require('../controller/homePosterController');

// GET /api/home-poster
router.get('/', homePosterController.getHomePoster);

// PUT /api/home-poster
router.put('/', homePosterController.updateHomePoster);

module.exports = router;
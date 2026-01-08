const express = require('express');
const router = express.Router();
const storyController = require('../controller/storyController');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', storyController.getStory);
router.put('/', auth, requireRole('admin'), storyController.updateStory);

module.exports = router;
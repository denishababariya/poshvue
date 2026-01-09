const express = require('express');
const { storeLocatorController } = require('../controller');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', storeLocatorController.get);
router.put('/', auth, storeLocatorController.update);

module.exports = router;

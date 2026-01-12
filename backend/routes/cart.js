

const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const cartController = require('../controller/cartController');


router.post("/add", auth, requireRole('user'),cartController.addToCart);
router.get("/", auth, requireRole('user'),cartController.getCart);
router.delete("/remove/:productId", auth, requireRole('user'),cartController.removeFromCart);
module.exports = router;
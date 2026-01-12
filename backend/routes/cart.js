

const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const controller = require('../controller');


router.post("/add", auth, requireRole('user'),controller.cartController.addToCart);
router.get("/", auth, requireRole('user'),controller.cartController.getCart);
router.delete("/remove/:productId", auth, requireRole('user'),controller.cartController.removeFromCart);
module.exports = router;


const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const cartController = require('../controller/cartController');


router.post("/add", auth, requireRole('user'), cartController.addToCart);
router.get("/", auth, requireRole('user'), cartController.getCart);
router.put("/update", auth, requireRole("user"), cartController.updateCartItem);
router.delete("/remove/:productId", auth, requireRole('user'), cartController.removeFromCart);
router.delete("/clear", auth, requireRole('user'), cartController.clearCart);
module.exports = router;
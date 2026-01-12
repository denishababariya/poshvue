const express = require("express");
const router = express.Router();

const  auth  = require("../middleware/auth");
const controller = require("../controller/wishlistController");

router.get("/", auth, controller.wishlistController.getWishlist);
router.post("/toggle", auth, controller.wishlistController.toggleWishlist);

module.exports = router;

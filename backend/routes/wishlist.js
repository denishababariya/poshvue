const express = require("express");
const router = express.Router();

const  {auth}  = require("../middleware/auth");
const wishlistController = require("../controller/wishlistController");

router.post("/toggle", auth, wishlistController.toggleWishlist);
router.get("/", auth, wishlistController.getWishlist);
router.delete("/:productId", auth, wishlistController.removeWishlistItem);

module.exports = router;

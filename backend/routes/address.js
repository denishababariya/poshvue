const express = require("express");
const { auth } = require("../middleware/auth");
const addressController = require("../controller/addressController");


const router = express.Router();

// router.post("/", auth, createAddress);
router.post("/add", auth, addressController.createAddress);

router.get("/", auth, addressController.getAddresses);
router.put("/:id", auth, addressController.updateAddress);
router.delete("/:id", auth, addressController.deleteAddress);

module.exports = router;

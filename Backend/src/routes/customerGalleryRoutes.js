const express = require("express");
const router = express.Router();
const customerGalleryController = require("../controllers/customerGalleryController");

// Get all active images
router.get("/active", customerGalleryController.activeImages);

module.exports = router;

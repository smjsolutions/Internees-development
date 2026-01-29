const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const adminGalleryController = require("../controllers/adminGalleryController");

// Upload new image
router.post(
  "/",
  (req, res, next) => {
    req.folder = "uploads/gallery";
    next();
  },
  upload.single("image"),
  adminGalleryController.uploadImage
);

// List all images
router.get("/", adminGalleryController.listImages);

// Get single image by ID (FIXED!)
router.get("/:id", adminGalleryController.getImageById);

// Update image / details
router.put(
  "/:id",
  (req, res, next) => {
    req.folder = "uploads/gallery";
    next();
  },
  upload.single("image"),
  adminGalleryController.updateImage
);

// Delete image
router.delete("/:id", adminGalleryController.deleteImage);

module.exports = router;

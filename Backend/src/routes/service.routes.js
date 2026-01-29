const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const router = express.Router();

// ➤ CREATE SERVICE (Upload multiple images to uploads/services)
router.post(
  "/",
  (req, res, next) => {
    req.folder = "uploads/services"; // ⬅ dynamic folder
    next();
  },
  upload.array("images", 5),
  createService
);

// ➤ GET ALL SERVICES
router.get("/", getAllServices);

// ➤ UPDATE SERVICE (Upload additional images / replace)
router.put(
  "/:id",
  (req, res, next) => {
    req.folder = "uploads/services"; // ⬅ dynamic folder
    next();
  },
  upload.array("images", 5),
  updateService
);

// ➤ DELETE SERVICE
router.delete("/:id", deleteService);

module.exports = router;

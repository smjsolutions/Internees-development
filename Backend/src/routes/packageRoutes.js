const express = require("express");
const router = express.Router();

const uploadPackage = require("../middleware/upload");

const {
  createPackage,
  updatePackage,
  getAllPackagesAdmin,
  getCustomerPackages,
  getPackageById, // ✅ ADD THIS
  togglePackageStatus,
  deletePackage,
} = require("../controllers/packageController");


// CREATE
router.post("/", uploadPackage.single("image"), createPackage);

// READ (ADMIN)
router.get("/", getAllPackagesAdmin);
router.get("/customer", getCustomerPackages);
router.get("/:id", getPackageById);


// UPDATE
router.put("/:id", uploadPackage.single("image"), updatePackage);

// ACTIVATE / DEACTIVATE
module.exports = router;

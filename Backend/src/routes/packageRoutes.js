const express = require("express");
const router = express.Router();

const uploadPackage = require("../middleware/upload");

const {
  createPackage,
  updatePackage,
  getAllPackagesAdmin,
<<<<<<< HEAD
  getCustomerPackages,
  getPackageById, // ✅ ADD THIS
  togglePackageStatus,
  deletePackage,
} = require("../controllers/packageController");


=======
  togglePackageStatus,
  getCustomerPackages,
  deletePackage,
} = require("../controllers/packageController");

>>>>>>> origin/master
// CREATE
router.post("/", uploadPackage.single("image"), createPackage);

// READ (ADMIN)
router.get("/", getAllPackagesAdmin);
router.get("/customer", getCustomerPackages);
<<<<<<< HEAD
router.get("/:id", getPackageById);

=======
>>>>>>> origin/master

// UPDATE
router.put("/:id", uploadPackage.single("image"), updatePackage);

// ACTIVATE / DEACTIVATE
router.patch("/:id/status", togglePackageStatus);

// SOFT DELETE
router.delete("/:id", deletePackage);

module.exports = router;

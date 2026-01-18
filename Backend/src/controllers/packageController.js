const Package = require("../models/Package");

/* ================= CREATE PACKAGE ================= */
const createPackage = async (req, res) => {
  try {
    const { name, services, totalDuration, price } = req.body;

    if (!name || !services || !totalDuration || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newPackage = await Package.create({
      name,
      services: JSON.parse(services),
      totalDuration,
      price,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create package",
      error: error.message,
    });
  }
};

/* ================= UPDATE PACKAGE ================= */
const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg || pkg.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    pkg.name = req.body.name || pkg.name;
    pkg.totalDuration = req.body.totalDuration || pkg.totalDuration;
    pkg.price = req.body.price || pkg.price;

    if (req.body.services) {
      pkg.services = JSON.parse(req.body.services);
    }

    if (req.file) {
      pkg.image = req.file.path;
    }

    await pkg.save();

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: pkg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update package",
      error: error.message,
    });
  }
};

/* ================= GET ALL PACKAGES (ADMIN) ================= */
const getAllPackagesAdmin = async (req, res) => {
  try {
    const { search, status } = req.query;

    let query = { isDeleted: false };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (status === "active") query.isActive = true;
    if (status === "inactive") query.isActive = false;

    const packages = await Package.find(query)
      .populate("services")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch packages",
      error: error.message,
    });
  }
};

/* ================= TOGGLE ACTIVE / INACTIVE ================= */
const togglePackageStatus = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    pkg.isActive = !pkg.isActive;
    await pkg.save();

    res.status(200).json({
      success: true,
      message: "Status updated",
      isActive: pkg.isActive,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

/* ================= SOFT DELETE PACKAGE ================= */
const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete package",
      error: error.message,
    });
  }
};

module.exports = {
  createPackage,
  updatePackage,
  getAllPackagesAdmin,
  togglePackageStatus,
  deletePackage,
};

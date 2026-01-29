const Service = require("../models/Service.model");
const fs = require("fs");
const path = require("path");

// CREATE SERVICE
const createService = async (req, res) => {
  try {
    const { name, category, description, duration, pricing } = req.body;

    if (!name || !category || !description || !duration || !pricing) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const images = req.files?.map(file => file.path) || [];

    const service = await Service.create({
      name,
      category,
      description,
      duration,
      pricing, // directly save as string
      images,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};


// GET ALL SERVICES
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

// UPDATE SERVICE
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, duration, pricing } = req.body;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Update fields
    service.name = name || service.name;
    service.category = category || service.category;
    service.description = description || service.description;
    service.duration = duration || service.duration;

    // ✅ store pricing as string
    if (pricing) {
      service.pricing = pricing;
    }

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      // Delete old images from disk
      service.images.forEach(oldImage => {
        const oldPath = path.resolve(oldImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      });

      // Save new images
      service.images = req.files.map(file => file.path);
    }

    const updatedService = await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};


// DELETE SERVICE
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Delete all images from disk
    service.images.forEach(img => {
      const imgPath = path.resolve(img);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};

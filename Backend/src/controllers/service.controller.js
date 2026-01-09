import Service from "../models/Service.model.js";

/* CREATE SERVICES */
export const createService = async (req, res) => {
  try {
    const { name, category, description, duration, pricing } = req.body;

    if (!name || !category || !description || !duration) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const parsedPricing = pricing ? JSON.parse(pricing) : [];
    const images = req.files?.map(file => file.path) || [];

    const service = await Service.create({
      name,
      category,
      description,
      duration,
      pricing: parsedPricing,
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


/* GET ALL SERVICES */
export const getAllServices = async (req, res) => {
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

import Service from "../models/Service.model.js";

export const createService = async (req, res) => {
  try {
    const { name, category, description, duration, pricing } = req.body;

    if (!name || !category || !description || !duration) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Pricing comes as JSON string from form-data
    const parsedPricing = pricing ? JSON.parse(pricing) : [];

    // Save image paths
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

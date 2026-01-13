const Service = require("../models/Service.model");

// Get All Services (Customer)
const getCustomerServices = async (req, res) => {
  try {
    const services = await Service.find().select(
      "name pricing images duration category description"
    );
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error("Customer API error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Single Service by ID (Customer)
const getCustomerServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).select(
      "name pricing images duration category description"
    );

    if (!service)
      return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    console.error("Customer API error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCustomerServices,
  getCustomerServiceById,
};

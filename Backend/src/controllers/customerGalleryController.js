const CustomerGallery = require("../models/Gallery");

// ---------------- Customer - active images only ----------------
exports.activeImages = async (req, res) => {
  try {
    const images = await CustomerGallery.find({ status: "active" }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

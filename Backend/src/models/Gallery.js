const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  image_url: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gallery", gallerySchema);

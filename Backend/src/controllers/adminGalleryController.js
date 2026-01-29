const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// Upload Gallery Image
exports.uploadImage = async (req, res) => {
  try {
    const gallery = new Gallery({
      title: req.body.title,
      category: req.body.category,
      status: req.body.status || "active",
      image_url: req.file ? req.file.path : null,
    });

    await gallery.save();
    res.status(201).json(gallery);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Gallery Image
exports.updateImage = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Not found" });

    gallery.title = req.body.title || gallery.title;
    gallery.category = req.body.category || gallery.category;
    gallery.status = req.body.status || gallery.status;

    if (req.file) {
      const oldPath = path.resolve(gallery.image_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      gallery.image_url = req.file.path;
    }

    await gallery.save();
    res.json(gallery);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Gallery Image
exports.deleteImage = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Not found" });

    const filePath = path.resolve(gallery.image_url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List Gallery Images
exports.listImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single image by ID (NEW FIX)
exports.getImageById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Image not found" });
    res.json(gallery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

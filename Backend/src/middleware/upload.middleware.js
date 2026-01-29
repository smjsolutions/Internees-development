const multer = require("multer");
const path = require("path");
const fs = require("fs");

// DYNAMIC STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.folder || "uploads/default";

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

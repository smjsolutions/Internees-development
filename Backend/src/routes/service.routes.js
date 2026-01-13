const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const router = express.Router();

router.post("/", upload.array("images", 5), createService);
router.get("/", getAllServices);
router.put("/:id", upload.array("images", 5), updateService);
router.delete("/:id", deleteService);

module.exports = router;

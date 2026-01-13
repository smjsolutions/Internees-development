const express = require("express");
const {
  getCustomerServices,
  getCustomerServiceById,
} = require("../controllers/customerService.controller");

const router = express.Router();

router.get("/", getCustomerServices);
router.get("/:id", getCustomerServiceById);

module.exports = router; // ✅ IMPORTANT

const express = require("express");
const router = express.Router();
const {
  updateUserRole,
  getAllRoles,
  getAuditLogs,
} = require("../controllers/roleController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin", "hr"));

router.put("/user/:userId", updateUserRole);
router.get("/", getAllRoles);
router.get("/audit-logs", getAuditLogs);

module.exports = router;

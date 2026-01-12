const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "role_change",
        "permission_change",
        "status_change",
        "password_reset",
        "login",
        "logout",
      ],
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    oldValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,
    ipAddress: String,
    userAgent: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);

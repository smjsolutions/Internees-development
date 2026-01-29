const mongoose = require("mongoose");

const adminAuditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["ADMIN_CREATED_USER", "ADMIN_UPDATED_USER"],
    },

    actor_admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      required: true,
    },

    target_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null,
    },

    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },

    ip_address: { type: String, default: null },
    user_agent: { type: String, default: null },
  },
  { timestamps: true }
);

const AdminAuditLog = mongoose.model("AdminAuditLog", adminAuditLogSchema);

module.exports = AdminAuditLog;

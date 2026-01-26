const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
    },

    password_hash: { type: String, required: true, select: false },

    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "MANAGER", "Staff", "customer","Receptionist"],
      default: "customer",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    created_by_admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null,
    },
  },
  { timestamps: true }
);

adminUserSchema.index({ email: 1 }, { unique: true });

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

module.exports = AdminUser;

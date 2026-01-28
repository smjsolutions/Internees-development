const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    password_hash: {
      type: String,
      required: true,
      
      minlength: [8, "Password must be at least 8 characters"],
       select: false,
    
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "INVENTORY_MANAGER", "RECEPTIONIST", "STAFF", "CUSTOMER"],
      default: "CUSTOMER",
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

/* ❌ REMOVE DUPLICATE INDEX WARNING
   Do NOT add schema.index({ email: 1 })
   because unique:true already creates index
*/

module.exports = mongoose.model("AdminUser", adminUserSchema);

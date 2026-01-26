const bcrypt = require("bcryptjs");
const AdminUser = require("../models/adminUser.model");

const adminCreateUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailExists = await AdminUser.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const usernameExists = await AdminUser.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const admin = await AdminUser.create({
      name,
      username,
      email,
      password_hash,
      role: role || "USER",
    });

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Create Admin Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// List all admin users
const adminListUsers = async (req, res) => {
  try {
    const users = await AdminUser.find().select("-password_hash"); // password hide kar rahe hain
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("List Admin Users Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update admin user
const adminUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, role } = req.body;

    const user = await AdminUser.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update Admin User Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const adminDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await AdminUser.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found",
      });
    }

    await AdminUser.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Admin user deleted successfully",
    });
  } catch (error) {
    console.error("Delete Admin Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  adminCreateUser,
  adminListUsers,
  adminUpdateUser,
  adminDeleteUser,
  
};

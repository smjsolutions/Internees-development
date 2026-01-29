const bcrypt = require("bcryptjs");
const AdminUser = require("../models/adminUser.model");

/* =========================
   CREATE ADMIN USER
========================= */
const adminCreateUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name === "Super Admin") {
      return res.status(403).json({
        success: false,
        message: "Super admin already exists",
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
      admin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   GET USERS WITH FILTERS
   ❌ SUPER ADMIN EXCLUDED
========================= */
const adminListUsers = async (req, res) => {
  try {
    const { search, role } = req.query;

    const filter = {
      name: { $ne: "Super Admin" }, // 🔥 HARD BLOCK
    };

    // 🔍 Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // 🎭 Role filter
    if (role) {
      filter.role = role;
    }

    const users = await AdminUser.find(filter).select("-password_hash");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   GET SINGLE USER
   ❌ SUPER ADMIN BLOCKED
========================= */
const adminGetUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await AdminUser.findOne({
      _id: id,
      name: { $ne: "Super Admin" },
    }).select("-password_hash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or protected",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/* =========================
   UPDATE USER
   ❌ SUPER ADMIN BLOCKED
========================= */
const adminUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await AdminUser.findOne({
      _id: id,
      name: { $ne: "Super Admin" },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or protected",
      });
    }

    Object.assign(user, req.body);
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   DELETE USER
   ❌ SUPER ADMIN BLOCKED
========================= */
const adminDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await AdminUser.findOne({
      _id: id,
      name: { $ne: "Super Admin" },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found or protected",
      });
    }

    await AdminUser.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Admin user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  adminCreateUser,
  adminListUsers,
  adminUpdateUser,
  adminDeleteUser,
  adminGetUser,
};

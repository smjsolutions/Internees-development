const bcrypt = require("bcryptjs");
const AdminUser = require("../models/adminUser.model");
const User = require("../models/User");

/* =========================
   CREATE ADMIN USER
========================= */
const adminCreateUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    // ✅ Check required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and include 1 uppercase letter, 1 lowercase letter, and 1 special character",
      });
    }

    // ✅ Prevent duplicate "Super Admin"
    if (name === "Super Admin") {
      return res.status(403).json({
        success: false,
        message: "Super admin already exists",
      });
    }

    // ✅ Check if email already exists
    const emailExistsInAdmin = await AdminUser.findOne({ email });
    const emailExistsInUser = await User.findOne({ email });

    if (emailExistsInAdmin || emailExistsInUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ✅ Check if username already exists
    const usernameExists = await AdminUser.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    // ✅ Hash the password
    const password_hash = await bcrypt.hash(password, 12);

    // ✅ Create the new admin user
    const admin = await AdminUser.create({
      name,
      username,
      email,
      password_hash,
      role: role || "ADMIN",
    });

    // ✅ Send response without password_hash
    const adminResponse = admin.toObject();
    delete adminResponse.password_hash;

    res.status(201).json({
      success: true,
      message: "Admin user created successfully",
      admin: adminResponse,
    });
  } catch (error) {
    console.error("adminCreateUser error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   LIST USERS (Admin + Customers)
========================= */
const adminListUsers = async (req, res) => {
  try {
    const { search, role } = req.query;

    const adminFilter = { name: { $ne: "Super Admin" } };
    const userFilter = {};

    if (search) {
      const regex = { $regex: search, $options: "i" };
      adminFilter.$or = [{ name: regex }, { username: regex }, { email: regex }];
      userFilter.$or = [{ name: regex }, { username: regex }, { email: regex }];
    }

    if (role) {
      adminFilter.role = role;
      userFilter.role = role.toLowerCase();
    }

    const adminUsers = await AdminUser.find(adminFilter).select("-password_hash");
    const customers = await User.find(userFilter).select("-password");

    const users = [
      ...adminUsers.map(u => ({
        ...u.toObject(),
        status: u.status,
        userType: "ADMIN",
      })),
      ...customers.map(u => ({
        ...u.toObject(),
        status: u.isActive ? "ACTIVE" : "INACTIVE",
        userType: "CUSTOMER",
      })),
    ];

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("adminListUsers error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   GET SINGLE USER
========================= */
const adminGetUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await AdminUser.findOne({
      _id: id,
      name: { $ne: "Super Admin" },
    }).select("-password_hash");

    let userType = "ADMIN";

    if (!user) {
      user = await User.findById(id).select("-password");
      userType = "CUSTOMER";
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or protected",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        status:
          userType === "CUSTOMER"
            ? user.isActive
              ? "ACTIVE"
              : "INACTIVE"
            : user.status,
        userType,
      },
    });
  } catch (error) {
    console.error("adminGetUser error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   UPDATE USER
========================= */
const adminUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, ...rest } = req.body;

    let user = await AdminUser.findOne({
      _id: id,
      name: { $ne: "Super Admin" },
    });

    let userType = "ADMIN";

    if (!user) {
      user = await User.findById(id);
      userType = "CUSTOMER";
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or protected",
      });
    }

    Object.assign(user, rest);

    if (status) {
      if (userType === "CUSTOMER") {
        user.isActive = status === "ACTIVE";
      } else {
        user.status = status;
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("adminUpdateUser error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   DELETE USER
========================= */
const adminDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await AdminUser.findOne({
      _id: id,
      name: { $ne: "Super Admin" },
    });

    if (!user) {
      user = await User.findById(id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or protected",
      });
    }

    if (user.constructor.modelName === "AdminUser") {
      await AdminUser.findByIdAndDelete(id);
    } else {
      await User.findByIdAndDelete(id);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("adminDeleteUser error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  adminCreateUser,
  adminListUsers,
  adminGetUser,
  adminUpdateUser,
  adminDeleteUser,
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminUser.model");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Username and password are required",
      });
    }

    const identifier = email.toLowerCase().trim();

    const user = await AdminUser.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password_hash _id name email username role status");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "Account is inactive",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

   if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET not defined in environment variables");
}

const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: process.env.JWT_REFRESH_EXPIRY|| "7d" }
);


    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

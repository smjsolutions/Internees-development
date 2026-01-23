const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminUser = require("../models/adminUser.model.js");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() })
      .select("+password_hash _id name email role status"); // ✅ include password_hash for login

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    if (user.status !== "ACTIVE") {
      return res.status(403).json({ message: "Account inactive" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminLogin };

const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminUser.model.js");

const adminRequireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // 🔹 Use the same secret as login
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await AdminUser.findById(decoded.user_id);

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (user.status !== "ACTIVE") {
      return res.status(403).json({ message: "Account inactive" });
    }

    req.user = { id: user._id.toString(), role: user.role };
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err); // 🔹 optional, for debugging
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { adminRequireAuth };

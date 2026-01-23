const bcrypt = require("bcrypt");
const AdminUser = require("../models/adminUser.model.js");
const { adminValidatePasswordRules } = require("../utils/adminPasswordRules.js");
const { adminWriteAuditLog } = require("../utils/adminAuditLogger.js");

const ADMIN_ALLOWED_ROLES = ["ADMIN", "MANAGER", "SUPPORT", "USER"];
const ADMIN_ALLOWED_STATUS = ["ACTIVE", "INACTIVE"];

/**
 * POST /admin/users
 */
const adminCreateUser = async (req, res) => {
  try {
    const adminId = req.user.id;

    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({
        message: "Missing required fields: name, email, role, password",
      });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    if (!ADMIN_ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    const pwErr = adminValidatePasswordRules(password);
    if (pwErr) return res.status(400).json({ message: pwErr });

    const existing = await AdminUser.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const password_hash = await bcrypt.hash(password, 12);

    const newUser = await AdminUser.create({
      name: String(name).trim(),
      email: normalizedEmail,
      role,
      password_hash,
      status: "ACTIVE",
      created_by_admin_id: adminId,
    });

    await adminWriteAuditLog({
      action: "ADMIN_CREATED_USER",
      actor_admin_id: adminId,
      target_user_id: newUser._id,
      metadata: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
      req,
    });

    return res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      created_at: newUser.createdAt,
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /admin/users
 */
const adminListUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);

    const search = (req.query.search || "").trim();
    const sort = req.query.sort === "oldest" ? "oldest" : "newest";

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const sortObj = { createdAt: sort === "oldest" ? 1 : -1 };

    const total = await AdminUser.countDocuments(filter);

    const users = await AdminUser.find(filter)
      .select("_id name email role status createdAt updatedAt") // ✅ no password_hash
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.json({
      page,
      limit,
      total,
      results: users.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        created_at: u.createdAt,
        updated_at: u.updatedAt,
      })),
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PATCH /admin/users/:id
 */
const adminUpdateUser = async (req, res) => {
  try {
    const adminId = req.user.id;
    const userId = req.params.id;

    const allowedFields = ["name", "role", "status"];
    const restrictedFields = ["email", "password", "password_hash", "created_by_admin_id"];

    const keys = Object.keys(req.body || {});

    for (const k of keys) {
      if (restrictedFields.includes(k)) {
        return res.status(400).json({ message: `Field "${k}" is not editable` });
      }
      if (!allowedFields.includes(k)) {
        return res.status(400).json({ message: `Field "${k}" is not allowed` });
      }
    }

    const before = await AdminUser.findById(userId).select("_id name role status email");
    if (!before) return res.status(404).json({ message: "User not found" });

    if (req.body.role && !ADMIN_ALLOWED_ROLES.includes(req.body.role)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    if (req.body.status && !ADMIN_ALLOWED_STATUS.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updates = {
      ...(typeof req.body.name === "string" && { name: req.body.name.trim() }),
      ...(req.body.role && { role: req.body.role }),
      ...(req.body.status && { status: req.body.status }),
    };

    const after = await AdminUser.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("_id name email role status createdAt updatedAt");

    await adminWriteAuditLog({
      action: "ADMIN_UPDATED_USER",
      actor_admin_id: adminId,
      target_user_id: after._id,
      metadata: {
        before: { name: before.name, role: before.role, status: before.status },
        after: { name: after.name, role: after.role, status: after.status },
      },
      req,
    });

    return res.json({
      id: after._id,
      name: after.name,
      email: after.email,
      role: after.role,
      status: after.status,
      updated_at: after.updatedAt,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  adminCreateUser,
  adminListUsers,
  adminUpdateUser,
};

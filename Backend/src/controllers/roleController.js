const User = require("../models/User");
const Role = require("../models/Role");
const AuditLog = require("../models/AuditLog");

// @desc    Update user role
// @route   PUT /api/roles/user/:userId
// @access  Private (Admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role, permissions } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldRole = user.role;
    const oldPermissions = [...user.permissions];

    user.role = role;
    user.permissions = permissions || [];
    user.roleChangedBy = req.user._id;
    user.roleChangedAt = Date.now();

    await user.save({ validateBeforeSave: false });

    // Audit log
    await AuditLog.create({
      user: req.user._id,
      action: "role_change",
      targetUser: user._id,
      oldValue: { role: oldRole, permissions: oldPermissions },
      newValue: { role, permissions },
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      description: `Role changed from ${oldRole} to ${role}`,
    });

    res.json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private (Admin only)
exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({ isActive: true });

    res.json({
      success: true,
      roles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get audit logs
// @route   GET /api/roles/audit-logs
// @access  Private (Admin only)
exports.getAuditLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, action, userId } = req.query;

    const query = {};
    if (action) query.action = action;
    if (userId) query.user = userId;

    const logs = await AuditLog.find(query)
      .populate("user", "email name")
      .populate("targetUser", "email name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await AuditLog.countDocuments(query);

    res.json({
      success: true,
      logs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

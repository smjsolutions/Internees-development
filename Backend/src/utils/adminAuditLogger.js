const AdminAuditLog = require("../models/adminAuditLog.model.js");

const adminWriteAuditLog = async ({
  action,
  actor_admin_id,
  target_user_id = null,
  metadata = {},
  req,
}) => {
  const audit = await AdminAuditLog.create({
    action,
    actor_admin_id,
    target_user_id,
    metadata,
    ip_address: req?.ip || null,
    user_agent: req?.headers?.["user-agent"] || null,
  });

  return audit;
};

module.exports = { adminWriteAuditLog };

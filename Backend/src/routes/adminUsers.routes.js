const express = require("express");
const { adminRequireAuth } = require("../middleware/adminAuth.middleware.js");
const { adminOnly } = require("../middleware/adminOnly.middleware.js");

const {
  adminCreateUser,
  adminListUsers,
  adminUpdateUser,
} = require("../controllers/adminUsers.controller.js");

const router = express.Router();
console.log({
  adminRequireAuth,
  adminOnly,
  adminCreateUser,
});


router.post("/users", adminRequireAuth, adminOnly, adminCreateUser);
router.get("/users", adminRequireAuth, adminOnly, adminListUsers);
router.patch("/users/:id", adminRequireAuth, adminOnly, adminUpdateUser);

module.exports = router;

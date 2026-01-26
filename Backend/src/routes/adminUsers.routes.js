const express = require("express");
const { adminRequireAuth, adminOnly } = require("../middleware/adminAuth.middleware");

const {
  adminCreateUser,
  adminListUsers,
  adminUpdateUser,
  adminDeleteUser,
  adminGetUser,
} = require("../controllers/adminUsers.controller");

const router = express.Router();

router.post("/users", adminRequireAuth, adminOnly, adminCreateUser);
router.get("/users", adminRequireAuth, adminOnly, adminListUsers);
router.patch("/users/:id", adminRequireAuth, adminOnly, adminUpdateUser);
router.delete("/users/:id", adminRequireAuth, adminOnly, adminDeleteUser);
router.get("/users/:id", adminRequireAuth, adminOnly, adminGetUser);


module.exports = router;

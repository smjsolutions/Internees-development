const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { loginLimiter } = require("../middleware/rateLimiter");

// Validation rules
const registerValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
  body("name").trim().notEmpty(),
];

const loginValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
];

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginLimiter, loginValidation, login);
router.get("/me", protect, getCurrentUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const { body } = require("express-validator");
const {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { loginLimiter } = require("../middleware/rateLimiter");

// ============================================
// VALIDATION RULES
// ============================================

const registerValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const forgotPasswordValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
];

const resetPasswordValidation = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
];

const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
];

// ============================================
// PUBLIC ROUTES
// ============================================

// Register
router.post("/register", registerValidation, register);

// Login
router.post("/login", loginLimiter, loginValidation, login);

// Forgot Password
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPasswordValidation, resetPassword);

// Refresh Token
router.post("/refresh-token", refreshToken);

// ============================================
// PROTECTED ROUTES (Require Authentication)
// ============================================

// Logout
router.post("/logout", protect, logout);

// Get Current User
router.get("/me", protect, getCurrentUser);

// Change Password
router.post(
  "/change-password",
  protect,
  changePasswordValidation,
  changePassword,
);

// ============================================
// GOOGLE OAUTH ROUTES
// ============================================

// Initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  async (req, res) => {
    try {
      const accessToken = generateAccessToken(req.user._id);
      const refreshToken = generateRefreshToken(req.user._id);

      // Save refresh token
      req.user.refreshTokens.push({ token: refreshToken });
      req.user.lastLogin = Date.now();
      await req.user.save({ validateBeforeSave: false });

      // Redirect to frontend with tokens
      res.redirect(
        `${process.env.CLIENT_URL}/login?` +
          `accessToken=${accessToken}&refreshToken=${refreshToken}`,
      );
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }
  },
);

// ============================================
// FACEBOOK OAUTH ROUTES
// ============================================

// Initiate Facebook OAuth
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  }),
);

// Facebook OAuth Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  async (req, res) => {
    try {
      const accessToken = generateAccessToken(req.user._id);
      const refreshToken = generateRefreshToken(req.user._id);

      // Save refresh token
      req.user.refreshTokens.push({ token: refreshToken });
      req.user.lastLogin = Date.now();
      await req.user.save({ validateBeforeSave: false });

      // Redirect to frontend with tokens
      res.redirect(
        `${process.env.CLIENT_URL}/login?` +
          `accessToken=${accessToken}&refreshToken=${refreshToken}`,
      );
    } catch (error) {
      console.error("Facebook OAuth callback error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }
  },
);

module.exports = router;

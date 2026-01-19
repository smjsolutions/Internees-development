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
  getCurrentUser,
  forgotPassword,
  resetPassword,
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
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

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

      req.user.refreshTokens.push({ token: refreshToken });
      await req.user.save({ validateBeforeSave: false });

      res.redirect(
        `${process.env.CLIENT_URL}/login?` +
          `accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }
  }
);

// Facebook OAuth
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"], session: false })
);

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

      req.user.refreshTokens.push({ token: refreshToken });
      await req.user.save({ validateBeforeSave: false });

      res.redirect(
        `${process.env.CLIENT_URL}/login?` +
          `accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }
  }
);

module.exports = router;

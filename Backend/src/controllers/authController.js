const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const { validationResult } = require("express-validator");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password, name, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username: username || null }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already registered" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    // Create user (not verified yet)
    const user = await User.create({
      email,
      username,
      password,
      name,
      phone,
      role: "CUSTOMER",
      isVerified: false, // ✅ Not verified by default
    });

    // Generate OTP
    const otp = user.generateVerificationOTP();
    await user.save({ validateBeforeSave: false });

    // Send verification email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%); padding: 30px; text-align: center; }
          .header h1 { color: #222227; margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .content p { color: #333; line-height: 1.6; }
          .otp-box { background-color: #f5f5f5; border: 2px dashed #BB8C4B; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
          .otp-code { font-size: 32px; font-weight: bold; color: #BB8C4B; letter-spacing: 8px; }
          .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; }
          .warning { background-color: #fff3cd; border-left: 4px solid #BB8C4B; padding: 12px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💎 Diamond Trim Beauty Studio</h1>
          </div>
          <div class="content">
            <h2>Welcome ${name}!</h2>
            <p>Thank you for registering with Diamond Trim Beauty Studio. To complete your registration, please verify your email address using the OTP code below:</p>
            
            <div class="otp-box">
              <p style="margin: 0; color: #666; font-size: 14px;">Your Verification Code</p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <p>Enter this code on the verification page to activate your account.</p>
            
            <div class="warning">
              <strong>⚠️ Important:</strong> This code will expire in 10 minutes. If you didn't create an account, please ignore this email.
            </div>
          </div>
          <div class="footer">
            <p>© 2025 Diamond Trim Beauty Studio. All rights reserved.</p>
            <p>Club Road, Near Desert Palm Hotel, Rahim Yar Khan</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Email Verification - Diamond Trim Beauty Studio",
        html: emailHtml,
      });

      res.status(201).json({
        success: true,
        message:
          "Registration successful. Please check your email for verification code.",
        userId: user._id, // Send userId for verification page
        email: user.email,
      });
    } catch (emailError) {
      // If email fails, delete the user
      await User.findByIdAndDelete(user._id);

      console.error("Email sending failed:", emailError);
      return res.status(500).json({
        message: "Failed to send verification email. Please try again.",
        error: emailError.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify email with OTP
// @route   POST /api/auth/verify-email
// @access  Public
exports.verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Validate inputs
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email,
      verificationOTP: otp,
      verificationOTPExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP. Please request a new one.",
      });
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpire = undefined;
    await user.save({ validateBeforeSave: false });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshTokens.push({ token: refreshToken });
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: "Email verified successfully",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resend verification OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified. Please login.",
      });
    }

    // Generate new OTP
    const otp = user.generateVerificationOTP();
    await user.save({ validateBeforeSave: false });

    // Send email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%); padding: 30px; text-align: center; }
          .header h1 { color: #222227; margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .content p { color: #333; line-height: 1.6; }
          .otp-box { background-color: #f5f5f5; border: 2px dashed #BB8C4B; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
          .otp-code { font-size: 32px; font-weight: bold; color: #BB8C4B; letter-spacing: 8px; }
          .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; }
          .warning { background-color: #fff3cd; border-left: 4px solid #BB8C4B; padding: 12px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💎 Diamond Trim Beauty Studio</h1>
          </div>
          <div class="content">
            <h2>New Verification Code</h2>
            <p>Hi ${user.name},</p>
            <p>You requested a new verification code. Here it is:</p>
            
            <div class="otp-box">
              <p style="margin: 0; color: #666; font-size: 14px;">Your Verification Code</p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="warning">
              <strong>⚠️ Important:</strong> This code will expire in 10 minutes.
            </div>
          </div>
          <div class="footer">
            <p>© 2025 Diamond Trim Beauty Studio. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: user.email,
      subject: "New Verification Code - Diamond Trim Beauty Studio",
      html: emailHtml,
    });

    res.json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({ message: "Account is inactive" });
    }
    // ❌ BLOCK unverified users
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshTokens.push({ token: refreshToken });
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%); padding: 30px; text-align: center; }
          .header h1 { color: #222227; margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .content p { color: #333; line-height: 1.6; }
          .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%); color: #222227; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; }
          .warning { background-color: #fff3cd; border-left: 4px solid #BB8C4B; padding: 12px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💎 Diamond Trim Beauty Studio</h1>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hi ${user.name || "there"},</p>
            <p>You requested to reset your password for your Diamond Trim account. Click the button below to reset it:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; word-break: break-all;">
              ${resetUrl}
            </p>
            <div class="warning">
              <strong>⚠️ Important:</strong> This link will expire in 10 minutes. If you didn't request this, please ignore this email.
            </div>
          </div>
          <div class="footer">
            <p>© 2025 Diamond Trim Beauty Studio. All rights reserved.</p>
            <p>Club Road, Near Desert Palm Hotel, Rahim Yar Khan</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request - Diamond Trim Beauty Studio",
        html: emailHtml,
      });

      res.json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (emailError) {
      // If email fails, remove token from user
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      console.error("Email sending failed:", emailError);
      return res.status(500).json({
        message: "Email could not be sent. Please try again later.",
        error: emailError.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

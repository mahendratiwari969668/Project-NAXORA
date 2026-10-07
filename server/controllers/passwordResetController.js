import crypto from "crypto";

import User from "../models/User.js";
import PasswordResetToken from "../models/PasswordResetToken.js";
import { hashPassword } from "../utils/auth.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    await PasswordResetToken.deleteMany({
      user: user._id,
      used: false,
    });

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await PasswordResetToken.create({
      user: user._id,
      token: tokenHash,
      expiresAt,
    });

    res.status(200).json({
      success: true,
      message: "Password reset token generated successfully",
      resetToken: rawToken,
      expiresAt,
    });
  } catch (error) {
    console.error(
      "Forgot password error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate password reset token",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const resetToken = await PasswordResetToken.findOne({
      token: tokenHash,
      used: false,
      expiresAt: {
        $gt: new Date(),
      },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const user = await User.findById(resetToken.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = await hashPassword(newPassword);

    await user.save();

    resetToken.used = true;
    await resetToken.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(
      "Reset password error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};
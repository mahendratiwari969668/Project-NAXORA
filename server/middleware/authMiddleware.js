import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.nexora_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    req.user = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      isVerified: user.isVerified,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
      });
    }

    console.error(
      "Authentication middleware error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

/**
 Cookie
  ↓
JWT verify
  ↓
User database se fetch
  ↓
User exists?
  ↓
Account active?
  ↓
req.user set
  ↓
Protected controller
 */
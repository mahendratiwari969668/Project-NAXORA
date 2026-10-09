import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const hasAuthCookie = Boolean(req.cookies?.nexora_token);
    const hasAuthHeader = Boolean(req.headers.authorization);

    let token = req.cookies?.nexora_token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log(
        `[AUTH DEBUG] 401: No token provided (${req.method} ${req.originalUrl || req.url}) | Auth cookie present: ${hasAuthCookie} | Auth header present: ${hasAuthHeader}`
      );
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("[AUTH DEBUG] 500: JWT_SECRET is not configured");
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log(
        `[AUTH DEBUG] 401: User not found in database for valid token`
      );
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    if (!user.isActive) {
      console.log(`[AUTH DEBUG] 403: User account is deactivated`);
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

    console.log(
      `[AUTH DEBUG] 200: User authenticated: true | Role: ${user.role} | User ID present: true`
    );

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      console.log(
        `[AUTH DEBUG] 401: Token verification failed (${error.name})`
      );
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
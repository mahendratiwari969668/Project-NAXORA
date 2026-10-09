import crypto from "crypto";
import mongoose from "mongoose";
import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import University from "../models/University.js";
import Institution from "../models/Institution.js";
import Department from "../models/Department.js";
import Course from "../models/Course.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/auth.js";
import { sendOtpEmail } from "../services/emailService.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

const generateSixDigitOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const hashOtp = (otp) => {
  return crypto.createHash("sha256").update(otp.trim()).digest("hex");
};

// POST /api/auth/student/register
export const registerStudent = async (req, res) => {
  console.log(`[AUTH] POST /api/auth/student/register received for: ${req.body?.email || "unknown"}`);
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      universityId,
      institutionId,
      departmentId,
      courseId,
      graduationYear,
      studentId,
    } = req.body;

    // 1. Validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (!universityId || !institutionId || !departmentId || !courseId || !graduationYear) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all academic details (University, College, Department, Course, Graduation Year)",
      });
    }

    // Validate ObjectId format
    if (
      !mongoose.Types.ObjectId.isValid(universityId) ||
      !mongoose.Types.ObjectId.isValid(institutionId) ||
      !mongoose.Types.ObjectId.isValid(departmentId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid academic identifier format. Please select valid options from the dropdowns.",
      });
    }

    // 2. Validate academic master-data references
    const [university, institution, department, course] = await Promise.all([
      University.findById(universityId),
      Institution.findById(institutionId),
      Department.findById(departmentId),
      Course.findById(courseId),
    ]);

    if (!university || !institution || !department || !course) {
      return res.status(400).json({
        success: false,
        message: "One or more academic selections are invalid. Please select from the dropdown lists.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "Student";
    const lastName = nameParts.slice(1).join(" ") || "User";

    // 3. Check for existing user
    let user = await User.findOne({ email: normalizedEmail });

    if (user && user.isVerified) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists and is verified. Please log in.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const rawOtp = generateSixDigitOtp();
    const codeHash = hashOtp(rawOtp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const resendAvailableAt = new Date(Date.now() + 60 * 1000); // 60 seconds

    if (user) {
      // Re-register unverified user
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = hashedPassword;
      user.role = "student";
      user.phone = mobile ? mobile.trim() : user.phone;
      user.isVerified = false;
      user.otp = {
        codeHash,
        expiresAt,
        purpose: "registration",
        resendAvailableAt,
        attempts: 0,
      };
      await user.save();
    } else {
      user = await User.create({
        firstName,
        lastName,
        email: normalizedEmail,
        password: hashedPassword,
        role: "student",
        phone: mobile ? mobile.trim() : "",
        isVerified: false,
        isActive: true,
        otp: {
          codeHash,
          expiresAt,
          purpose: "registration",
          resendAvailableAt,
          attempts: 0,
        },
      });
    }

    // 4. Upsert StudentProfile with academic details
    let profile = await StudentProfile.findOne({ user: user._id });
    const academicData = {
      university: university._id,
      institution: institution._id,
      department: department._id,
      course: course._id,
      universityName: university.name,
      institutionName: institution.name,
      departmentName: department.name,
      courseName: course.name,
      graduationYear: Number(graduationYear),
      studentId: studentId ? studentId.trim() : "",
    };

    if (profile) {
      profile.phone = mobile ? mobile.trim() : profile.phone;
      profile.academic = academicData;
      profile.institute = {
        name: institution.name,
        university: university.name,
        affiliation: university.name,
      };
      await profile.save();
    } else {
      await StudentProfile.create({
        user: user._id,
        phone: mobile ? mobile.trim() : "",
        academic: academicData,
        institute: {
          name: institution.name,
          university: university.name,
          affiliation: university.name,
        },
      });
    }

    // 5. Send OTP Email safely
    try {
      await sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "registration",
        firstName,
      });
    } catch (emailErr) {
      console.error("[AUTH] Email delivery exception:", emailErr.message);
      // If dev mode is enabled, we still allow registration
      if (process.env.OTP_DEV_MODE !== "true") {
        return res.status(503).json({
          success: false,
          message: "Account was created, but unable to send verification email. Please check server configuration.",
        });
      }
    }

    return res.status(201).json({
      success: true,
      message: "Registration initiated. A 6-digit verification code has been sent to your email.",
      email: normalizedEmail,
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("registerStudent error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to initiate student registration",
    });
  }
};

// POST /api/auth/student/verify-otp
export const verifyStudentOtp = async (req, res) => {
  console.log(`[AUTH] POST /api/auth/student/verify-otp received for: ${req.body?.email || "unknown"}`);
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and 6-digit verification code are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    if (cleanOtp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit verification code",
      });
    }

    const user = await User.findOne({ email: normalizedEmail }).select("+otp.codeHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account not found with this email",
      });
    }

    if (user.isVerified) {
      const token = generateToken(user);
      res.cookie("nexora_token", token, cookieOptions);

      return res.status(200).json({
        success: true,
        message: "Account is already verified",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          isVerified: true,
        },
      });
    }

    if (!user.otp || !user.otp.codeHash || !user.otp.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "No active verification code found. Please request a new code.",
      });
    }

    // Check attempts limit
    if (user.otp.attempts >= 5) {
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Please request a new verification code.",
      });
    }

    // Check expiration
    if (Date.now() > new Date(user.otp.expiresAt).getTime()) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new code.",
      });
    }

    // Compare hash
    const inputHash = hashOtp(cleanOtp);
    if (inputHash !== user.otp.codeHash) {
      user.otp.attempts = (user.otp.attempts || 0) + 1;
      await user.save();

      const remainingAttempts = 5 - user.otp.attempts;
      return res.status(400).json({
        success: false,
        message: `Invalid verification code. ${remainingAttempts > 0 ? `${remainingAttempts} attempt(s) remaining.` : "Please request a new code."}`,
      });
    }

    // Verified!
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = generateToken(user);
    res.cookie("nexora_token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Account verified successfully! Welcome to NEXORA.",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isVerified: true,
      },
    });
  } catch (error) {
    console.error("verifyStudentOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify code. Please try again.",
    });
  }
};

// POST /api/auth/student/resend-otp
export const resendStudentOtp = async (req, res) => {
  console.log(`[AUTH] POST /api/auth/student/resend-otp received for: ${req.body?.email || "unknown"}`);
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified. Please sign in.",
      });
    }

    // Cooldown check (60s)
    if (user.otp?.resendAvailableAt && Date.now() < new Date(user.otp.resendAvailableAt).getTime()) {
      const secondsLeft = Math.ceil((new Date(user.otp.resendAvailableAt).getTime() - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${secondsLeft} seconds before requesting a new code.`,
        cooldownSeconds: secondsLeft,
      });
    }

    const rawOtp = generateSixDigitOtp();
    const codeHash = hashOtp(rawOtp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const resendAvailableAt = new Date(Date.now() + 60 * 1000);

    user.otp = {
      codeHash,
      expiresAt,
      purpose: "registration",
      resendAvailableAt,
      attempts: 0,
    };
    await user.save();

    try {
      await sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "registration",
        firstName: user.firstName,
      });
    } catch (emailErr) {
      console.error("[AUTH] Resend OTP email failed:", emailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email.",
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("resendStudentOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to resend verification code",
    });
  }
};

// POST /api/auth/student/login
export const loginStudent = async (req, res) => {
  console.log(`[AUTH] POST /api/auth/student/login received for: ${req.body?.email || "unknown"}`);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email and password",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for student accounts.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account is currently inactive. Please contact support.",
      });
    }

    const passwordMatches = await comparePassword(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if account is verified
    if (!user.isVerified) {
      const rawOtp = generateSixDigitOtp();
      const codeHash = hashOtp(rawOtp);
      user.otp = {
        codeHash,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        purpose: "registration",
        resendAvailableAt: new Date(Date.now() + 60 * 1000),
        attempts: 0,
      };
      await user.save();

      try {
        await sendOtpEmail({
          to: normalizedEmail,
          otp: rawOtp,
          purpose: "registration",
          firstName: user.firstName,
        });
      } catch (e) {
        console.error("[AUTH] Verification OTP email error:", e.message);
      }

      return res.status(403).json({
        success: false,
        isUnverified: true,
        email: normalizedEmail,
        message: "Your email is not verified yet. A verification code has been sent to your email.",
      });
    }

    // Account verified: initiate 2FA login verification
    const rawOtp = generateSixDigitOtp();
    const codeHash = hashOtp(rawOtp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const resendAvailableAt = new Date(Date.now() + 60 * 1000);

    user.otp = {
      codeHash,
      expiresAt,
      purpose: "login",
      resendAvailableAt,
      attempts: 0,
    };
    await user.save();

    try {
      await sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "login",
        firstName: user.firstName,
      });
    } catch (e) {
      console.error("[AUTH] Login OTP email error:", e.message);
    }

    return res.status(200).json({
      success: true,
      otpRequired: true,
      message: "Verification code sent to your registered email.",
      email: normalizedEmail,
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("loginStudent error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to proceed with login",
    });
  }
};

// POST /api/auth/student/verify-login-otp
export const verifyStudentLoginOtp = async (req, res) => {
  console.log(`[AUTH] POST /api/auth/student/verify-login-otp received for: ${req.body?.email || "unknown"}`);
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and 6-digit code are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    if (cleanOtp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit verification code",
      });
    }

    const user = await User.findOne({ email: normalizedEmail }).select("+otp.codeHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account not found",
      });
    }

    if (!user.otp || !user.otp.codeHash || !user.otp.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "No active login code found. Please sign in again.",
      });
    }

    if (user.otp.attempts >= 5) {
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Please request a new code.",
      });
    }

    if (Date.now() > new Date(user.otp.expiresAt).getTime()) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please sign in again.",
      });
    }

    const inputHash = hashOtp(cleanOtp);
    if (inputHash !== user.otp.codeHash) {
      user.otp.attempts = (user.otp.attempts || 0) + 1;
      await user.save();

      const remainingAttempts = 5 - user.otp.attempts;
      return res.status(400).json({
        success: false,
        message: `Invalid verification code. ${remainingAttempts > 0 ? `${remainingAttempts} attempt(s) remaining.` : "Please request a new code."}`,
      });
    }

    // Login successful
    user.otp = undefined;
    await user.save();

    const token = generateToken(user);
    res.cookie("nexora_token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("verifyStudentLoginOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify login code",
    });
  }
};

// POST /api/auth/student/resend-login-otp
export const resendStudentLoginOtp = async (req, res) => {
  console.log(`[AUTH] POST /api/auth/student/resend-login-otp received for: ${req.body?.email || "unknown"}`);
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student account not found",
      });
    }

    if (user.otp?.resendAvailableAt && Date.now() < new Date(user.otp.resendAvailableAt).getTime()) {
      const secondsLeft = Math.ceil((new Date(user.otp.resendAvailableAt).getTime() - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${secondsLeft} seconds before requesting a new code.`,
        cooldownSeconds: secondsLeft,
      });
    }

    const rawOtp = generateSixDigitOtp();
    const codeHash = hashOtp(rawOtp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const resendAvailableAt = new Date(Date.now() + 60 * 1000);

    user.otp = {
      codeHash,
      expiresAt,
      purpose: "login",
      resendAvailableAt,
      attempts: 0,
    };
    await user.save();

    try {
      await sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "login",
        firstName: user.firstName,
      });
    } catch (e) {
      console.error("[AUTH] Resend login OTP email error:", e.message);
    }

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email.",
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("resendStudentLoginOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to resend login code",
    });
  }
};

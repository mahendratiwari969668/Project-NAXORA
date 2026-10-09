import crypto from "crypto";
import fs from "fs";
import User from "../models/User.js";
import InstitutionProfile from "../models/InstitutionProfile.js";
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

// POST /api/auth/institution/register
export const registerInstitution = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/institution/register received for: ${
      req.body?.officialEmail || "unknown"
    }`
  );

  try {
    const {
      institutionName,
      institutionType,
      affiliation,
      officialEmail,
      website,
      country,
      state,
      district,
      extraAddress,
      authorizedPerson,
      designation,
      contactNumber,
      password,
    } = req.body;

    // 1. Validation
    if (!institutionName || !institutionName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Institution name is required.",
      });
    }

    if (!institutionType || !institutionType.trim()) {
      return res.status(400).json({
        success: false,
        message: "Institution type is required.",
      });
    }

    if (!officialEmail || !officialEmail.trim()) {
      return res.status(400).json({
        success: false,
        message: "Official email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(officialEmail.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid official email address.",
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    if (!authorizedPerson || !authorizedPerson.trim()) {
      return res.status(400).json({
        success: false,
        message: "Authorized person name is required.",
      });
    }

    if (!contactNumber || !contactNumber.trim()) {
      return res.status(400).json({
        success: false,
        message: "Contact number is required.",
      });
    }

    if (!state || !district || !extraAddress) {
      return res.status(400).json({
        success: false,
        message: "State, district, and additional address are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "A supporting document (PDF, JPG, or PNG) is required.",
      });
    }

    const normalizedEmail = officialEmail.trim().toLowerCase();

    // 2. Check for existing user
    let user = await User.findOne({ email: normalizedEmail });

    // Case A: Email belongs to a different role (e.g. Student or Company)
    if (user && user.role !== "institution") {
      if (req.file && fs.existsSync(req.file.path)) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkErr) {
          console.error("Failed to delete orphaned file:", unlinkErr.message);
        }
      }

      return res.status(409).json({
        success: false,
        alreadyVerified: user.isVerified,
        role: user.role,
        message: `This email is already registered as a ${user.role} account on NEXORA. Please sign in via the ${user.role} portal or use a different official institutional email.`,
      });
    }

    // Case B: Email belongs to an already verified Institution account
    if (user && user.role === "institution" && user.isVerified) {
      if (req.file && fs.existsSync(req.file.path)) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkErr) {
          console.error("Failed to delete orphaned file:", unlinkErr.message);
        }
      }

      return res.status(409).json({
        success: false,
        alreadyVerified: true,
        role: "institution",
        message: "An institution account with this official email already exists and is verified. Please sign in.",
      });
    }

    // Prepare document data if a file was uploaded
    let docData = null;
    if (req.file) {
      docData = {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        fileUrl: `/uploads/institutions/${req.file.filename}`,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadedAt: new Date(),
      };
    }

    // Name extraction for User model
    const nameParts = authorizedPerson.trim().split(" ");
    const firstName = nameParts[0] || "Institution";
    const lastName = nameParts.slice(1).join(" ") || "Admin";

    // Handle existing unverified account
    if (user && !user.isVerified) {
      console.log(`[AUTH] Resuming verification for existing unverified institution: ${normalizedEmail}`);

      // Ensure profile exists or is updated safely
      const profileUpdate = {
        instituteName: institutionName.trim(),
        affiliation: affiliation ? affiliation.trim() : "",
        institutionType: institutionType.trim().toLowerCase(),
        website: website ? website.trim() : "",
        location: {
          country: country ? country.trim() : "India",
          state: state.trim(),
          district: district.trim(),
          extraAddress: extraAddress.trim(),
        },
        authorizedPerson: {
          name: authorizedPerson.trim(),
          designation: designation ? designation.trim() : "",
          contactNumber: contactNumber.trim(),
        },
        contact: {
          email: normalizedEmail,
          phone: contactNumber.trim(),
        },
      };

      if (docData) {
        profileUpdate.supportingDocument = docData;
      }

      await InstitutionProfile.findOneAndUpdate(
        { user: user._id },
        { $set: profileUpdate },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // Check if cooldown is active
      if (
        user.otp?.resendAvailableAt &&
        Date.now() < new Date(user.otp.resendAvailableAt).getTime()
      ) {
        const secondsLeft = Math.ceil(
          (new Date(user.otp.resendAvailableAt).getTime() - Date.now()) / 1000
        );

        return res.status(200).json({
          success: true,
          isExistingUnverified: true,
          email: normalizedEmail,
          cooldownSeconds: secondsLeft,
          message:
            `An unverified registration already exists for this email. Please enter your verification code below, or wait ${secondsLeft} seconds to request a new code.`,
        });
      }

      // Generate a fresh OTP for the unverified account
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
        const emailResult = await sendOtpEmail({
          to: normalizedEmail,
          otp: rawOtp,
          purpose: "registration",
          firstName: user.firstName,
          role: "institution",
        });

        if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
          throw new Error("SMTP server did not accept message for delivery.");
        }
      } catch (emailErr) {
        console.error(
          `[AUTH] Existing unverified OTP email delivery error for ${normalizedEmail} [${emailErr.code || "EMAIL_FAILED"}]: ${emailErr.message}`
        );
        if (process.env.OTP_DEV_MODE !== "true") {
          return res.status(503).json({
            success: false,
            isExistingUnverified: true,
            email: normalizedEmail,
            message:
              "An unverified registration exists, but unable to send verification email via SMTP. Please check server configuration or try again.",
          });
        }
      }

      return res.status(200).json({
        success: true,
        isExistingUnverified: true,
        email: normalizedEmail,
        cooldownSeconds: 60,
        message:
          "An unverified registration exists for this email. A fresh 6-digit verification code has been sent to your official email.",
      });
    }

    // New user registration
    const hashedPassword = await hashPassword(password);
    const rawOtp = generateSixDigitOtp();
    const codeHash = hashOtp(rawOtp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const resendAvailableAt = new Date(Date.now() + 60 * 1000); // 60 seconds

    user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "institution",
      phone: contactNumber.trim(),
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

    // Create InstitutionProfile
    const profileData = {
      instituteName: institutionName.trim(),
      affiliation: affiliation ? affiliation.trim() : "",
      institutionType: institutionType.trim().toLowerCase(),
      website: website ? website.trim() : "",
      location: {
        country: country ? country.trim() : "India",
        state: state.trim(),
        district: district.trim(),
        extraAddress: extraAddress.trim(),
      },
      authorizedPerson: {
        name: authorizedPerson.trim(),
        designation: designation ? designation.trim() : "",
        contactNumber: contactNumber.trim(),
      },
      contact: {
        email: normalizedEmail,
        phone: contactNumber.trim(),
      },
      supportingDocument: docData,
      verification: {
        status: "pending",
        verifiedAt: null,
      },
    };

    await InstitutionProfile.create({
      user: user._id,
      ...profileData,
    });

    // Send OTP Email safely
    try {
      const emailResult = await sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "registration",
        firstName,
        role: "institution",
      });

      if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
        throw new Error("SMTP server did not accept message for delivery.");
      }
    } catch (emailErr) {
      console.error(
        `[AUTH] Institution registration email delivery error for ${normalizedEmail} [${emailErr.code || "EMAIL_FAILED"}]: ${emailErr.message}`
      );
      if (process.env.OTP_DEV_MODE !== "true") {
        return res.status(503).json({
          success: false,
          email: normalizedEmail,
          message:
            "Institution account was created, but unable to send verification email via SMTP. Please try resending the code.",
        });
      }
    }

    return res.status(201).json({
      success: true,
      message:
        "Registration initiated. A 6-digit verification code has been sent to your official email.",
      email: normalizedEmail,
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("registerInstitution error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to initiate institution registration.",
    });
  }
};

// POST /api/auth/institution/verify-otp
export const verifyInstitutionOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/institution/verify-otp received for: ${
      req.body?.email || "unknown"
    }`
  );

  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Official email and 6-digit verification code are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    if (cleanOtp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit verification code.",
      });
    }

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+otp.codeHash"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Institution account not found with this email.",
      });
    }

    if (user.role !== "institution") {
      return res.status(403).json({
        success: false,
        message: "This verification portal is only for institution accounts.",
      });
    }

    const profile = await InstitutionProfile.findOne({ user: user._id });

    if (user.isVerified) {
      const token = generateToken(user);
      res.cookie("nexora_token", token, cookieOptions);

      return res.status(200).json({
        success: true,
        message: "Account email is already verified.",
        approvalStatus: profile?.verification?.status || "pending",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          isVerified: true,
        },
        institution: {
          instituteName: profile?.instituteName || "",
          approvalStatus: profile?.verification?.status || "pending",
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
        message:
          "Too many failed attempts. Please request a new verification code.",
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
        message: `Invalid verification code. ${
          remainingAttempts > 0
            ? `${remainingAttempts} attempt(s) remaining.`
            : "Please request a new code."
        }`,
      });
    }

    // Mark email as verified
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = generateToken(user);
    res.cookie("nexora_token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message:
        "Official email verified successfully. Your institution account is submitted for administrative review.",
      approvalStatus: profile?.verification?.status || "pending",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isVerified: true,
      },
      institution: {
        instituteName: profile?.instituteName || "",
        approvalStatus: profile?.verification?.status || "pending",
      },
    });
  } catch (error) {
    console.error("verifyInstitutionOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify code. Please try again.",
    });
  }
};

// POST /api/auth/institution/resend-otp
export const resendInstitutionOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/institution/resend-otp received for: ${
      req.body?.email || "unknown"
    }`
  );

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Official email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Institution account not found.",
      });
    }

    if (user.role !== "institution") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for institution accounts.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account email is already verified. Please sign in.",
      });
    }

    // Cooldown check (60s)
    if (
      user.otp?.resendAvailableAt &&
      Date.now() < new Date(user.otp.resendAvailableAt).getTime()
    ) {
      const secondsLeft = Math.ceil(
        (new Date(user.otp.resendAvailableAt).getTime() - Date.now()) / 1000
      );
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
      const emailResult = await sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "registration",
        firstName: user.firstName,
        role: "institution",
      });

      if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
        throw new Error("SMTP server did not accept message for delivery.");
      }
    } catch (emailErr) {
      console.error(
        `[AUTH] Resend institution OTP email error for ${normalizedEmail} [${emailErr.code || "EMAIL_FAILED"}]: ${emailErr.message}`
      );
      if (process.env.OTP_DEV_MODE !== "true") {
        return res.status(503).json({
          success: false,
          message:
            "Unable to send verification code via SMTP. Please check server configuration or try again later.",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your official email.",
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("resendInstitutionOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to resend verification code.",
    });
  }
};

// POST /api/auth/institution/login
export const loginInstitution = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/institution/login received for: ${
      req.body?.identifier || "unknown"
    }`
  );

  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your official email/contact number and password.",
      });
    }

    const cleanIdentifier = identifier.trim();
    let user = null;

    if (cleanIdentifier.includes("@")) {
      user = await User.findOne({ email: cleanIdentifier.toLowerCase() });
    } else {
      // Find by user.phone or InstitutionProfile contact.phone / authorizedPerson.contactNumber
      user = await User.findOne({ phone: cleanIdentifier, role: "institution" });
      if (!user) {
        const profile = await InstitutionProfile.findOne({
          $or: [
            { "contact.phone": cleanIdentifier },
            { "authorizedPerson.contactNumber": cleanIdentifier },
          ],
        });
        if (profile) {
          user = await User.findById(profile.user);
        }
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid official email/contact number or password.",
      });
    }

    if (user.role !== "institution") {
      return res.status(403).json({
        success: false,
        role: user.role,
        message: `This account is registered as a ${user.role} account. Please sign in via the ${user.role} portal.`,
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account is currently deactivated. Please contact support.",
      });
    }

    const passwordMatches = await comparePassword(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid official email/contact number or password.",
      });
    }

    const profile = await InstitutionProfile.findOne({ user: user._id });

    // Check if account email is verified
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
        const emailResult = await sendOtpEmail({
          to: user.email,
          otp: rawOtp,
          purpose: "registration",
          firstName: user.firstName,
          role: "institution",
        });

        if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
          throw new Error("SMTP server did not accept message for delivery.");
        }
      } catch (e) {
        console.error(
          `[AUTH] Institution verification OTP email error for ${user.email} [${e.code || "EMAIL_FAILED"}]: ${e.message}`
        );
        if (process.env.OTP_DEV_MODE !== "true") {
          return res.status(503).json({
            success: false,
            isUnverified: true,
            email: user.email,
            message:
              "Your official email is not verified, but unable to send verification email via SMTP. Please try again later.",
          });
        }
      }

      return res.status(403).json({
        success: false,
        isUnverified: true,
        email: user.email,
        message:
          "Your official email is not verified yet. A verification code has been sent to your email.",
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
      const emailResult = await sendOtpEmail({
        to: user.email,
        otp: rawOtp,
        purpose: "login",
        firstName: user.firstName,
        role: "institution",
      });

      if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
        throw new Error("SMTP server did not accept message for delivery.");
      }
    } catch (e) {
      console.error(`[AUTH] Institution login OTP email error for ${user.email} [${e.code || "EMAIL_FAILED"}]: ${e.message}`);
      if (process.env.OTP_DEV_MODE !== "true") {
        return res.status(503).json({
          success: false,
          message: "Unable to send login verification code via SMTP. Please try again later.",
        });
      }
    }

    return res.status(200).json({
      success: true,
      otpRequired: true,
      message: "Verification code sent to your registered official email.",
      email: user.email,
      cooldownSeconds: 60,
      approvalStatus: profile?.verification?.status || "pending",
    });
  } catch (error) {
    console.error("loginInstitution error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to proceed with institution login.",
    });
  }
};

// POST /api/auth/institution/verify-login-otp
export const verifyInstitutionLoginOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/institution/verify-login-otp received for: ${
      req.body?.email || "unknown"
    }`
  );

  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Official email and 6-digit code are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    if (cleanOtp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit verification code.",
      });
    }

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+otp.codeHash"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Institution account not found.",
      });
    }

    if (user.role !== "institution") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for institution accounts.",
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
        message: `Invalid verification code. ${
          remainingAttempts > 0
            ? `${remainingAttempts} attempt(s) remaining.`
            : "Please request a new code."
        }`,
      });
    }

    // Login successful
    user.otp = undefined;
    await user.save();

    const profile = await InstitutionProfile.findOne({ user: user._id });

    const token = generateToken(user);
    res.cookie("nexora_token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Sign in successful. Welcome to NEXORA.",
      approvalStatus: profile?.verification?.status || "pending",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isVerified: user.isVerified,
      },
      institution: {
        instituteName: profile?.instituteName || "",
        approvalStatus: profile?.verification?.status || "pending",
      },
    });
  } catch (error) {
    console.error("verifyInstitutionLoginOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify login code. Please try again.",
    });
  }
};

// POST /api/auth/institution/resend-login-otp
export const resendInstitutionLoginOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/institution/resend-login-otp received for: ${
      req.body?.email || "unknown"
    }`
  );

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Official email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Institution account not found.",
      });
    }

    if (user.role !== "institution") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for institution accounts.",
      });
    }

    if (
      user.otp?.resendAvailableAt &&
      Date.now() < new Date(user.otp.resendAvailableAt).getTime()
    ) {
      const secondsLeft = Math.ceil(
        (new Date(user.otp.resendAvailableAt).getTime() - Date.now()) / 1000
      );
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
        role: "institution",
      });
    } catch (e) {
      console.error(
        "[AUTH] Resend institution login OTP email error:",
        e.message
      );
    }

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your registered official email.",
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("resendInstitutionLoginOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to resend login code.",
    });
  }
};

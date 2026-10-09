import crypto from "crypto";
import fs from "fs";
import User from "../models/User.js";
import CompanyProfile from "../models/CompanyProfile.js";
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

const isCompanyOtpDevMode = () => {
  return (
    process.env.NODE_ENV !== "production" &&
    (process.env.COMPANY_OTP_DEV_MODE === "true" || process.env.OTP_DEV_MODE === "true")
  );
};

const logCompanyDevOtp = (email, otp) => {
  if (isCompanyOtpDevMode()) {
    console.log(
      `\n================================================================================\n[NEXORA COMPANY DEV OTP] Recipient: ${email} | OTP: ${otp}\n================================================================================\n`
    );
  }
};

// POST /api/auth/company/register
export const registerCompany = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/company/register received for: ${
      req.body?.officialEmail || "unknown"
    }`
  );

  try {
    const {
      companyName,
      companyType,
      industry,
      officialEmail,
      website,
      country,
      state,
      district,
      extraAddress,
      authorizedPerson,
      designation,
      phone,
      password,
    } = req.body;

    // 1. Validation
    if (!companyName || !companyName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (!companyType || !companyType.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company type is required.",
      });
    }

    if (!industry || !industry.trim()) {
      return res.status(400).json({
        success: false,
        message: "Industry selection is required.",
      });
    }

    if (!officialEmail || !officialEmail.trim()) {
      return res.status(400).json({
        success: false,
        message: "Official company email is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(officialEmail.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid official company email address.",
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
        message: "Authorized representative name is required.",
      });
    }

    if (!designation || !designation.trim()) {
      return res.status(400).json({
        success: false,
        message: "Representative designation is required.",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Contact phone number is required.",
      });
    }

    if (!state || !district || !extraAddress) {
      return res.status(400).json({
        success: false,
        message: "State, district, and address details are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company verification document (PDF, JPG, or PNG) is required.",
      });
    }

    const normalizedEmail = officialEmail.trim().toLowerCase();

    // 2. Check for existing user
    let user = await User.findOne({ email: normalizedEmail });

    // Case A: Email belongs to a different role (e.g. Student or Institution)
    if (user && user.role !== "company") {
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
        message: `This email is already registered as a ${user.role} account on NEXORA. Please sign in via the ${user.role} portal or use a different official company email.`,
      });
    }

    // Case B: Email belongs to an already verified Company account
    if (user && user.role === "company" && user.isVerified) {
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
        role: "company",
        message: "A company account with this official email already exists and is verified. Please sign in.",
      });
    }

    // Prepare document data
    let docData = null;
    if (req.file) {
      docData = {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        fileUrl: `/uploads/companies/${req.file.filename}`,
        mimeType: req.file.mimetype,
        size: req.file.size,
        uploadedAt: new Date(),
      };
    }

    // Name extraction for User model
    const nameParts = authorizedPerson.trim().split(" ");
    const firstName = nameParts[0] || "Company";
    const lastName = nameParts.slice(1).join(" ") || "Admin";

    // Case C: Handle existing unverified account -> resume verification
    if (user && !user.isVerified) {
      console.log(`[AUTH] Resuming verification for existing unverified company: ${normalizedEmail}`);

      const profileUpdate = {
        companyName: companyName.trim(),
        companyType: companyType.trim().toLowerCase(),
        industry: industry.trim(),
        website: website ? website.trim() : "",
        location: {
          country: country ? country.trim() : "India",
          state: state.trim(),
          district: district.trim(),
          extraAddress: extraAddress.trim(),
        },
        headquarters: {
          city: district.trim(),
          state: state.trim(),
          country: country ? country.trim() : "India",
        },
        authorizedPerson: {
          name: authorizedPerson.trim(),
          designation: designation.trim(),
          contactNumber: phone.trim(),
        },
        contact: {
          email: normalizedEmail,
          phone: phone.trim(),
        },
      };

      if (docData) {
        profileUpdate.supportingDocument = docData;
      }

      const hashedPassword = await hashPassword(password);
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone.trim();
      user.password = hashedPassword;

      await CompanyProfile.findOneAndUpdate(
        { user: user._id },
        { $set: profileUpdate },
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
      );

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

      if (isCompanyOtpDevMode()) {
        logCompanyDevOtp(normalizedEmail, rawOtp);
        sendOtpEmail({
          to: normalizedEmail,
          otp: rawOtp,
          purpose: "registration",
          firstName: user.firstName,
          role: "company",
        }).catch((emailErr) => {
          console.warn(
            `[AUTH] (Dev mode) Background email dispatch note for ${normalizedEmail}: ${emailErr.message}`
          );
        });
      } else {
        try {
          const emailResult = await sendOtpEmail({
            to: normalizedEmail,
            otp: rawOtp,
            purpose: "registration",
            firstName: user.firstName,
            role: "company",
          });

          if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
            throw new Error("SMTP server did not accept message for delivery.");
          }
        } catch (emailErr) {
          console.error(
            `[AUTH] Existing unverified company OTP email delivery error for ${normalizedEmail} [${emailErr.code || "EMAIL_FAILED"}]: ${emailErr.message}`
          );
          user.otp.resendAvailableAt = undefined;
          await user.save();

          if (process.env.OTP_DEV_MODE !== "true") {
            return res.status(503).json({
              success: false,
              isExistingUnverified: true,
              email: normalizedEmail,
              message:
                "An unverified registration exists, but unable to send verification email via SMTP. Please try again.",
            });
          }
        }
      }

      return res.status(200).json({
        success: true,
        isDevMode: isCompanyOtpDevMode(),
        isExistingUnverified: true,
        email: normalizedEmail,
        cooldownSeconds: 60,
        message: isCompanyOtpDevMode()
          ? "Development mode: Check the backend server terminal for your verification code."
          : "An unverified registration exists for this email. A fresh 6-digit verification code has been sent to your official company email.",
      });
    }

    // Case D: New company registration
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
      role: "company",
      phone: phone.trim(),
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

    // Create CompanyProfile
    const profileData = {
      companyName: companyName.trim(),
      companyType: companyType.trim().toLowerCase(),
      industry: industry.trim(),
      website: website ? website.trim() : "",
      location: {
        country: country ? country.trim() : "India",
        state: state.trim(),
        district: district.trim(),
        extraAddress: extraAddress.trim(),
      },
      headquarters: {
        city: district.trim(),
        state: state.trim(),
        country: country ? country.trim() : "India",
      },
      authorizedPerson: {
        name: authorizedPerson.trim(),
        designation: designation.trim(),
        contactNumber: phone.trim(),
      },
      contact: {
        email: normalizedEmail,
        phone: phone.trim(),
      },
      supportingDocument: docData,
      verification: {
        status: "pending",
        verifiedAt: null,
      },
    };

    await CompanyProfile.create({
      user: user._id,
      ...profileData,
    });

    // Send OTP Email safely
    if (isCompanyOtpDevMode()) {
      logCompanyDevOtp(normalizedEmail, rawOtp);
      sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "registration",
        firstName,
        role: "company",
      }).catch((emailErr) => {
        console.warn(
          `[AUTH] (Dev mode) Background email dispatch note for ${normalizedEmail}: ${emailErr.message}`
        );
      });
    } else {
      try {
        const emailResult = await sendOtpEmail({
          to: normalizedEmail,
          otp: rawOtp,
          purpose: "registration",
          firstName,
          role: "company",
        });

        if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
          throw new Error("SMTP server did not accept message for delivery.");
        }
      } catch (emailErr) {
        console.error(
          `[AUTH] Company registration email delivery error for ${normalizedEmail} [${emailErr.code || "EMAIL_FAILED"}]: ${emailErr.message}`
        );
        user.otp.resendAvailableAt = undefined;
        await user.save();

        if (process.env.OTP_DEV_MODE !== "true") {
          return res.status(503).json({
            success: false,
            email: normalizedEmail,
            message:
              "Company account was created, but unable to send verification email via SMTP. Please check your network and try again.",
          });
        }
      }
    }

    return res.status(201).json({
      success: true,
      isDevMode: isCompanyOtpDevMode(),
      message: isCompanyOtpDevMode()
        ? "Development mode: Check the backend server terminal for your verification code."
        : "Registration initiated. A 6-digit verification code has been sent to your official company email.",
      email: normalizedEmail,
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("registerCompany error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during company registration.",
    });
  }
};

// POST /api/auth/company/verify-otp
export const verifyCompanyOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/company/verify-otp received for: ${
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

    const cleanOtp = otp.toString().trim();
    if (!/^\d{6}$/.test(cleanOtp)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit verification code.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+otp.codeHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Company account not found.",
      });
    }

    if (user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for company accounts.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account email is already verified. Please sign in.",
      });
    }

    if (!user.otp || !user.otp.codeHash) {
      return res.status(400).json({
        success: false,
        message: "No active verification code found. Please request a new code.",
      });
    }

    if (user.otp.attempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Maximum verification attempts exceeded. Please request a new code.",
      });
    }

    if (new Date() > new Date(user.otp.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new code.",
      });
    }

    if (user.otp.purpose !== "registration") {
      return res.status(400).json({
        success: false,
        message: "Invalid verification purpose.",
      });
    }

    const submittedHash = hashOtp(cleanOtp);
    if (submittedHash !== user.otp.codeHash) {
      user.otp.attempts = (user.otp.attempts || 0) + 1;
      await user.save();

      const remainingAttempts = 5 - user.otp.attempts;
      return res.status(400).json({
        success: false,
        message: `Invalid verification code. ${remainingAttempts} attempts remaining.`,
      });
    }

    // OTP Verified successfully!
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = generateToken(user);
    res.cookie("nexora_token", token, cookieOptions);

    // Verify company profile exists and maintain pending approval status
    const profile = await CompanyProfile.findOne({ user: user._id });

    return res.status(200).json({
      success: true,
      message:
        "Official email verified successfully. Your company account is submitted for administrative review.",
      token,
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
      company: {
        companyName: profile?.companyName || "",
        approvalStatus: profile?.verification?.status || "pending",
      },
    });
  } catch (error) {
    console.error("verifyCompanyOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify code. Please try again.",
    });
  }
};

// POST /api/auth/company/resend-otp
export const resendCompanyOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/company/resend-otp received for: ${
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
        message: "Company account not found.",
      });
    }

    if (user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for company accounts.",
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

    if (isCompanyOtpDevMode()) {
      logCompanyDevOtp(normalizedEmail, rawOtp);
      sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "registration",
        firstName: user.firstName,
        role: "company",
      }).catch((emailErr) => {
        console.warn(
          `[AUTH] (Dev mode) Background email dispatch note for ${normalizedEmail}: ${emailErr.message}`
        );
      });
    } else {
      try {
        const emailResult = await sendOtpEmail({
          to: normalizedEmail,
          otp: rawOtp,
          purpose: "registration",
          firstName: user.firstName,
          role: "company",
        });

        if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
          throw new Error("SMTP server did not accept message for delivery.");
        }
      } catch (emailErr) {
        console.error(
          `[AUTH] Resend company OTP email error for ${normalizedEmail} [${emailErr.code || "EMAIL_FAILED"}]: ${emailErr.message}`
        );
        user.otp.resendAvailableAt = undefined;
        await user.save();

        if (process.env.OTP_DEV_MODE !== "true") {
          return res.status(503).json({
            success: false,
            message:
              "Unable to send verification code via SMTP. Please check server configuration or try again later.",
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      isDevMode: isCompanyOtpDevMode(),
      message: isCompanyOtpDevMode()
        ? "Development mode: Check the backend server terminal for your verification code."
        : "A new verification code has been sent to your official company email.",
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("resendCompanyOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to resend verification code.",
    });
  }
};

// POST /api/auth/company/login
export const loginCompany = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/company/login received for: ${
      req.body?.identifier || "unknown"
    }`
  );

  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your official email/phone and password.",
      });
    }

    const cleanIdentifier = identifier.trim();
    let user = null;

    if (cleanIdentifier.includes("@")) {
      const normalizedEmail = cleanIdentifier.toLowerCase();
      user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        const profile = await CompanyProfile.findOne({
          "contact.email": normalizedEmail,
        });
        if (profile) {
          user = await User.findById(profile.user);
        }
      }
    } else {
      const cleanDigits = cleanIdentifier.replace(/\D/g, "");
      const phoneCandidates = [cleanIdentifier];
      if (cleanDigits) {
        phoneCandidates.push(cleanDigits);
        if (cleanDigits.length >= 10) {
          const tenDigits = cleanDigits.slice(-10);
          phoneCandidates.push(tenDigits);
          phoneCandidates.push("0" + tenDigits);
          phoneCandidates.push("91" + tenDigits);
          phoneCandidates.push("+91" + tenDigits);
        }
      }

      const phoneRegex = cleanDigits.length >= 10
        ? new RegExp(`${cleanDigits.slice(-10)}$`)
        : null;

      const phoneFilter = phoneRegex
        ? { $or: [{ phone: { $in: phoneCandidates } }, { phone: phoneRegex }] }
        : { phone: { $in: phoneCandidates } };

      user = await User.findOne({
        role: "company",
        ...phoneFilter,
      });

      if (!user) {
        const profileFilter = phoneRegex
          ? {
              $or: [
                { "contact.phone": { $in: phoneCandidates } },
                { "contact.phone": phoneRegex },
                { "authorizedPerson.contactNumber": { $in: phoneCandidates } },
                { "authorizedPerson.contactNumber": phoneRegex },
              ],
            }
          : {
              $or: [
                { "contact.phone": { $in: phoneCandidates } },
                { "authorizedPerson.contactNumber": { $in: phoneCandidates } },
              ],
            };

        const profile = await CompanyProfile.findOne(profileFilter);
        if (profile) {
          user = await User.findById(profile.user);
        }
      }

      if (!user) {
        const otherUser = await User.findOne(phoneFilter);
        if (otherUser && otherUser.role !== "company") {
          return res.status(403).json({
            success: false,
            role: otherUser.role,
            message: `This contact number is registered as a ${otherUser.role} account. Please sign in via the ${otherUser.role} portal.`,
          });
        }
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid official company email/phone or password.",
      });
    }

    if (user.role !== "company") {
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
        message: "Invalid official company email/phone or password.",
      });
    }

    const profile = await CompanyProfile.findOne({ user: user._id });

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

      if (isCompanyOtpDevMode()) {
        logCompanyDevOtp(user.email, rawOtp);
        sendOtpEmail({
          to: user.email,
          otp: rawOtp,
          purpose: "registration",
          firstName: user.firstName,
          role: "company",
        }).catch((emailErr) => {
          console.warn(
            `[AUTH] (Dev mode) Background email dispatch note for ${user.email}: ${emailErr.message}`
          );
        });
      } else {
        try {
          const emailResult = await sendOtpEmail({
            to: user.email,
            otp: rawOtp,
            purpose: "registration",
            firstName: user.firstName,
            role: "company",
          });

          if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
            throw new Error("SMTP server did not accept message for delivery.");
          }
        } catch (e) {
          console.error(
            `[AUTH] Company verification OTP email error for ${user.email} [${e.code || "EMAIL_FAILED"}]: ${e.message}`
          );
          user.otp.resendAvailableAt = undefined;
          await user.save();

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
      }

      return res.status(403).json({
        success: false,
        isUnverified: true,
        isDevMode: isCompanyOtpDevMode(),
        email: user.email,
        message: isCompanyOtpDevMode()
          ? "Your official email is not verified yet. Development mode: Check the backend server terminal for your verification code."
          : "Your official email is not verified yet. A verification code has been sent to your email.",
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

    if (isCompanyOtpDevMode()) {
      logCompanyDevOtp(user.email, rawOtp);
      sendOtpEmail({
        to: user.email,
        otp: rawOtp,
        purpose: "login",
        firstName: user.firstName,
        role: "company",
      }).catch((emailErr) => {
        console.warn(
          `[AUTH] (Dev mode) Background email dispatch note for ${user.email}: ${emailErr.message}`
        );
      });
    } else {
      try {
        const emailResult = await sendOtpEmail({
          to: user.email,
          otp: rawOtp,
          purpose: "login",
          firstName: user.firstName,
          role: "company",
        });

        if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
          throw new Error("SMTP server did not accept message for delivery.");
        }
      } catch (e) {
        console.error(
          `[AUTH] Company login OTP email error for ${user.email} [${e.code || "EMAIL_FAILED"}]: ${e.message}`
        );
        user.otp.resendAvailableAt = undefined;
        await user.save();

        if (process.env.OTP_DEV_MODE !== "true") {
          return res.status(503).json({
            success: false,
            message: "Unable to send login verification code via SMTP. Please try again later.",
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      otpRequired: true,
      isDevMode: isCompanyOtpDevMode(),
      message: isCompanyOtpDevMode()
        ? "Development mode: Check the backend server terminal for your login verification code."
        : "Verification code sent to your registered official email.",
      email: user.email,
      cooldownSeconds: 60,
      approvalStatus: profile?.verification?.status || "pending",
    });
  } catch (error) {
    console.error("loginCompany error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to proceed with company login.",
    });
  }
};

// POST /api/auth/company/verify-login-otp
export const verifyCompanyLoginOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/company/verify-login-otp received for: ${
      req.body?.email || "unknown"
    }`
  );

  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required.",
      });
    }

    const cleanOtp = otp.toString().trim();
    if (!/^\d{6}$/.test(cleanOtp)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit verification code.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+otp.codeHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Company account not found.",
      });
    }

    if (user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for company accounts.",
      });
    }

    if (!user.otp || !user.otp.codeHash) {
      return res.status(400).json({
        success: false,
        message: "No active login code found. Please request a new code.",
      });
    }

    if (user.otp.purpose !== "login") {
      return res.status(400).json({
        success: false,
        message: "Invalid verification purpose.",
      });
    }

    if (user.otp.attempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Maximum verification attempts exceeded. Please request a new code.",
      });
    }

    if (new Date() > new Date(user.otp.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please sign in again.",
      });
    }

    const submittedHash = hashOtp(cleanOtp);
    if (submittedHash !== user.otp.codeHash) {
      user.otp.attempts = (user.otp.attempts || 0) + 1;
      await user.save();

      const remainingAttempts = 5 - user.otp.attempts;
      return res.status(400).json({
        success: false,
        message: `Invalid verification code. ${remainingAttempts} attempts remaining.`,
      });
    }

    // Login OTP successful! Clear OTP & issue token
    user.otp = undefined;
    await user.save();

    const token = generateToken(user);
    res.cookie("nexora_token", token, cookieOptions);

    const profile = await CompanyProfile.findOne({ user: user._id });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
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
      company: {
        companyName: profile?.companyName || "",
        approvalStatus: profile?.verification?.status || "pending",
      },
    });
  } catch (error) {
    console.error("verifyCompanyLoginOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify login code.",
    });
  }
};

// POST /api/auth/company/resend-login-otp
export const resendCompanyLoginOtp = async (req, res) => {
  console.log(
    `[AUTH] POST /api/auth/company/resend-login-otp received for: ${
      req.body?.email || "unknown"
    }`
  );

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Company account not found.",
      });
    }

    if (user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "This portal is only for company accounts.",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account email is not verified.",
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
      purpose: "login",
      resendAvailableAt,
      attempts: 0,
    };
    await user.save();

    if (isCompanyOtpDevMode()) {
      logCompanyDevOtp(normalizedEmail, rawOtp);
      sendOtpEmail({
        to: normalizedEmail,
        otp: rawOtp,
        purpose: "login",
        firstName: user.firstName,
        role: "company",
      }).catch((emailErr) => {
        console.warn(
          `[AUTH] (Dev mode) Background email dispatch note for ${normalizedEmail}: ${emailErr.message}`
        );
      });
    } else {
      try {
        const emailResult = await sendOtpEmail({
          to: normalizedEmail,
          otp: rawOtp,
          purpose: "login",
          firstName: user.firstName,
          role: "company",
        });

        if (!emailResult?.delivered && process.env.OTP_DEV_MODE !== "true") {
          throw new Error("SMTP server did not accept message for delivery.");
        }
      } catch (emailErr) {
        console.error(
          `[AUTH] Resend company login OTP email error for ${normalizedEmail} [${emailErr.code || "EMAIL_FAILED"}]: ${emailErr.message}`
        );
        user.otp.resendAvailableAt = undefined;
        await user.save();

        if (process.env.OTP_DEV_MODE !== "true") {
          return res.status(503).json({
            success: false,
            message:
              "Unable to send verification code via SMTP. Please try again later.",
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      isDevMode: isCompanyOtpDevMode(),
      message: isCompanyOtpDevMode()
        ? "Development mode: Check the backend server terminal for your verification code."
        : "A new login verification code has been sent to your official company email.",
      cooldownSeconds: 60,
    });
  } catch (error) {
    console.error("resendCompanyLoginOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to resend login verification code.",
    });
  }
};

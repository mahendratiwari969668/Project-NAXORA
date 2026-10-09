import express from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";

import {
  registerStudent,
  verifyStudentOtp,
  resendStudentOtp,
  loginStudent,
  verifyStudentLoginOtp,
  resendStudentLoginOtp,
} from "../controllers/studentAuthController.js";

import {
  registerInstitution,
  verifyInstitutionOtp,
  resendInstitutionOtp,
  loginInstitution,
  verifyInstitutionLoginOtp,
  resendInstitutionLoginOtp,
} from "../controllers/institutionAuthController.js";

import {
  registerCompany,
  verifyCompanyOtp,
  resendCompanyOtp,
  loginCompany,
  verifyCompanyLoginOtp,
  resendCompanyLoginOtp,
} from "../controllers/companyAuthController.js";

import { uploadInstitutionDocument } from "../middleware/institutionUploadMiddleware.js";
import { uploadCompanyDocument } from "../middleware/companyUploadMiddleware.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// COMPANY SPECIFIC AUTH FLOW
// POST /api/auth/company/register
router.post(
  "/company/register",
  uploadCompanyDocument,
  registerCompany
);

// POST /api/auth/company/verify-otp
router.post("/company/verify-otp", verifyCompanyOtp);

// POST /api/auth/company/resend-otp
router.post("/company/resend-otp", resendCompanyOtp);

// POST /api/auth/company/login
router.post("/company/login", loginCompany);

// POST /api/auth/company/verify-login-otp
router.post("/company/verify-login-otp", verifyCompanyLoginOtp);

// POST /api/auth/company/resend-login-otp
router.post("/company/resend-login-otp", resendCompanyLoginOtp);


// INSTITUTION SPECIFIC AUTH FLOW
// POST /api/auth/institution/register
router.post(
  "/institution/register",
  uploadInstitutionDocument,
  registerInstitution
);

// POST /api/auth/institution/verify-otp
router.post("/institution/verify-otp", verifyInstitutionOtp);

// POST /api/auth/institution/resend-otp
router.post("/institution/resend-otp", resendInstitutionOtp);

// POST /api/auth/institution/login
router.post("/institution/login", loginInstitution);

// POST /api/auth/institution/verify-login-otp
router.post("/institution/verify-login-otp", verifyInstitutionLoginOtp);

// POST /api/auth/institution/resend-login-otp
router.post("/institution/resend-login-otp", resendInstitutionLoginOtp);


// STUDENT SPECIFIC AUTH FLOW
// POST /api/auth/student/register
router.post("/student/register", registerStudent);

// POST /api/auth/student/verify-otp
router.post("/student/verify-otp", verifyStudentOtp);

// POST /api/auth/student/resend-otp
router.post("/student/resend-otp", resendStudentOtp);

// POST /api/auth/student/login
router.post("/student/login", loginStudent);

// POST /api/auth/student/verify-login-otp
router.post("/student/verify-login-otp", verifyStudentLoginOtp);

// POST /api/auth/student/resend-login-otp
router.post("/student/resend-login-otp", resendStudentLoginOtp);


// GENERIC AUTH ROUTES
// POST /api/auth/register (handles students if academic data passed, or legacy register)
router.post("/register", (req, res, next) => {
  if (req.body.role === "student" && req.body.universityId) {
    return registerStudent(req, res);
  }
  return register(req, res, next);
});

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyStudentOtp);

// POST /api/auth/resend-otp
router.post("/resend-otp", resendStudentOtp);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/logout
router.post("/logout", logout);

// CURRENT USER
// GET /api/auth/me
router.get("/me", protect, getCurrentUser);

export default router;
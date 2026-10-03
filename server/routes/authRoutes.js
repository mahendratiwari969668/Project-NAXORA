import express from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// =========================================================
// REGISTER
// POST /api/auth/register
// =========================================================

router.post("/register", register);


// =========================================================
// LOGIN
// POST /api/auth/login
// =========================================================

router.post("/login", login);


// =========================================================
// LOGOUT
// POST /api/auth/logout
// =========================================================

router.post("/logout", logout);


// =========================================================
// CURRENT USER
// GET /api/auth/me
// =========================================================

router.get("/me", protect, getCurrentUser);


export default router;
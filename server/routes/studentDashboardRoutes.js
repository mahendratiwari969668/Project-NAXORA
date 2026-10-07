import express from "express";

import {
  getStudentDashboard,
} from "../controllers/studentDashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getStudentDashboard);

export default router;
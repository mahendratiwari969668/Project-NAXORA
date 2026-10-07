import express from "express";

import {
  getResume,
  uploadResume,
  deleteResume,
  updateResumeAnalysis,
} from "../controllers/resumeController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getResume);

router.post("/", protect, uploadResume);

router.delete("/", protect, deleteResume);

router.put("/analysis", protect, updateResumeAnalysis);

export default router;
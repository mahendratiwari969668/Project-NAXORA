import express from "express";
import multer from "multer";
import {
  analyzeStudentResume,
  uploadAndAnalyzeResume,
  getStudentResumeAnalysis,
} from "../controllers/aiResumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/analyze",
  protect,
  allowRoles("student"),
  analyzeStudentResume
);

router.post(
  "/upload-analyze",
  protect,
  allowRoles("student"),
  upload.single("resume"),
  uploadAndAnalyzeResume
);

router.get(
  "/analysis",
  protect,
  allowRoles("student"),
  getStudentResumeAnalysis
);

export default router;
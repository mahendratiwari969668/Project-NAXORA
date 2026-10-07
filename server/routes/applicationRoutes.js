import express from "express";

import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  withdrawApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getApplications);

router.get("/:applicationId", protect, getApplicationById);

router.post("/", protect, createApplication);

router.put("/:applicationId", protect, updateApplication);

router.put(
  "/:applicationId/withdraw",
  protect,
  withdrawApplication
);

router.delete("/:applicationId", protect, deleteApplication);

export default router;
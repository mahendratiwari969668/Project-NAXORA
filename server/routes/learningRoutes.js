import express from "express";

import {
  getLearningResources,
  getLearningResourceById,
  addLearningResource,
  updateLearningResource,
  deleteLearningResource,
} from "../controllers/learningController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getLearningResources);

router.get("/:resourceId", protect, getLearningResourceById);

router.post("/", protect, addLearningResource);

router.put("/:resourceId", protect, updateLearningResource);

router.delete("/:resourceId", protect, deleteLearningResource);

export default router;
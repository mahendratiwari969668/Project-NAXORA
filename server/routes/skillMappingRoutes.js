import express from "express";

import {
  getSkillMapping,
  createOrUpdateSkillMapping,
  recalculateSkillMapping,
  deleteSkillMapping,
} from "../controllers/skillMappingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSkillMapping);

router.post("/", protect, createOrUpdateSkillMapping);

router.put("/recalculate", protect, recalculateSkillMapping);

router.delete("/", protect, deleteSkillMapping);

export default router;
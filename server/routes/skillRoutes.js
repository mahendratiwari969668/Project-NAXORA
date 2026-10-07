import express from "express";

import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSkills);

router.post("/", protect, addSkill);

router.put("/:skillId", protect, updateSkill);

router.delete("/:skillId", protect, deleteSkill);

export default router;
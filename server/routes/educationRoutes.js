// Esme in 4 APIs ko protected routes se connect karenge.

import express from "express";

import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEducation);

router.post("/", protect, addEducation);

router.put("/:educationId", protect, updateEducation);

router.delete("/:educationId", protect, deleteEducation);

export default router;
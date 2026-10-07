import express from "express";

import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProjects);

router.post("/", protect, addProject);

router.put("/:projectId", protect, updateProject);

router.delete("/:projectId", protect, deleteProject);

export default router;
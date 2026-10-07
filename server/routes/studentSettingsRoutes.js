import express from "express";

import {
  getStudentSettings,
  updateStudentSettings,
  changeStudentPassword,
  deactivateStudentAccount,
} from "../controllers/studentSettingsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getStudentSettings);

router.put("/", protect, updateStudentSettings);

router.put("/password", protect, changeStudentPassword);

router.put("/deactivate", protect, deactivateStudentAccount);

export default router;
import express from "express";
import {
  getInstitutionStudentOverview,
} from "../controllers/institutionStudentOverviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/:studentId", protect, allowRoles("institution"), getInstitutionStudentOverview);

export default router;
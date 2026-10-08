import express from "express";
import {
  getInstitutionApplications,
  getInstitutionApplicationById,
  searchInstitutionApplications,
} from "../controllers/institutionApplicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("institution"), getInstitutionApplications);
router.get("/search", protect, allowRoles("institution"), searchInstitutionApplications);
router.get("/:applicationId", protect, allowRoles("institution"), getInstitutionApplicationById);

export default router;
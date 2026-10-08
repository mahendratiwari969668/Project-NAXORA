import express from "express";
import {
  getInstitutionStudents,
  getInstitutionStudentById,
    searchInstitutionStudents,
} from "../controllers/institutionStudentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("institution"), getInstitutionStudents);

router.get("/search", protect, allowRoles("institution"), searchInstitutionStudents);

router.get("/:studentId", protect, allowRoles("institution"), getInstitutionStudentById);

export default router;
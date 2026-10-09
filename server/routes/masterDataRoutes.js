import express from "express";
import {
  getUniversities,
  getInstitutions,
  getDepartments,
  getCourses,
} from "../controllers/masterDataController.js";

const router = express.Router();

// Universities
router.get("/universities", getUniversities);

// Institutions (Colleges)
router.get("/universities/:universityId/institutions", getInstitutions);
router.get("/institutions", getInstitutions);

// Departments
router.get("/institutions/:institutionId/departments", getDepartments);
router.get("/departments", getDepartments);

// Courses
router.get("/departments/:departmentId/courses", getCourses);
router.get("/courses", getCourses);

export default router;

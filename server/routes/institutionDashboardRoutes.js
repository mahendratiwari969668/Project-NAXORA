import express from "express";
import {
  getInstitutionDashboard,
} from "../controllers/institutionDashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("institution"),
  getInstitutionDashboard
);

export default router;
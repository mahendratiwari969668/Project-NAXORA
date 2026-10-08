import express from "express";
import {
  getCompanyDashboard,
} from "../controllers/companyDashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("company"),
  getCompanyDashboard
);

export default router;
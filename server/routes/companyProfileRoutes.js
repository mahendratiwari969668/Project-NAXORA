import express from "express";

import {
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyProfileController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("company"),
  getCompanyProfile
);

router.put(
  "/",
  protect,
  allowRoles("company"),
  updateCompanyProfile
);

export default router;
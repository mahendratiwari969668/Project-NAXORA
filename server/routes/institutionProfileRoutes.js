import express from "express";

import {
  getInstitutionProfile,
  updateInstitutionProfile,
} from "../controllers/institutionProfileController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("institution"),
  getInstitutionProfile
);

router.put(
  "/",
  protect,
  allowRoles("institution"),
  updateInstitutionProfile
);

export default router;
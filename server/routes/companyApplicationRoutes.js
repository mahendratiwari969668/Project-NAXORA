import express from "express";

import {
  getCompanyApplications,
  getCompanyApplicationById,
  updateCompanyApplicationStatus,
  searchCompanyApplications,
} from "../controllers/companyApplicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("company"),
  getCompanyApplications
);

router.get(
  "/search",
  protect,
  allowRoles("company"),
  searchCompanyApplications
);

router.get(
  "/:applicationId",
  protect,
  allowRoles("company"),
  getCompanyApplicationById
);

router.put(
  "/:applicationId/status",
  protect,
  allowRoles("company"),
  updateCompanyApplicationStatus
);



export default router;
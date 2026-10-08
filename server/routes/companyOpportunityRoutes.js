import express from "express";

import {
  getCompanyOpportunities,
  createCompanyOpportunity,
  updateCompanyOpportunity,
  deleteCompanyOpportunity,
} from "../controllers/companyOpportunityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("company"),
  getCompanyOpportunities
);

router.post(
  "/",
  protect,
  allowRoles("company"),
  createCompanyOpportunity
);

router.put(
  "/:opportunityId",
  protect,
  allowRoles("company"),
  updateCompanyOpportunity
);

router.delete(
  "/:opportunityId",
  protect,
  allowRoles("company"),
  deleteCompanyOpportunity
);

export default router;
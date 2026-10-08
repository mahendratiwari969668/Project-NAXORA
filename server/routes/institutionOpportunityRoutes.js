import express from "express";
import {
  getInstitutionOpportunities,
  createInstitutionOpportunity,
  updateInstitutionOpportunity,
  deleteInstitutionOpportunity,
} from "../controllers/institutionOpportunityController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("institution"), getInstitutionOpportunities);

router.post("/", protect, allowRoles("institution"), createInstitutionOpportunity);

router.put("/:opportunityId", protect, allowRoles("institution"), updateInstitutionOpportunity);

router.delete("/:opportunityId", protect, allowRoles("institution"), deleteInstitutionOpportunity);

export default router;
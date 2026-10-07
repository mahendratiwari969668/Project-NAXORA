import express from "express";

import {
  getOpportunities,
  getOpportunityById,
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "../controllers/opportunityController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getOpportunities);

router.get("/:opportunityId", protect, getOpportunityById);

router.post("/", protect, addOpportunity);

router.put("/:opportunityId", protect, updateOpportunity);

router.delete("/:opportunityId", protect, deleteOpportunity);

export default router;
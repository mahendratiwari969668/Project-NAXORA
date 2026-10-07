import express from "express";

import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCertifications);

router.post("/", protect, addCertification);

router.put("/:certificationId", protect, updateCertification);

router.delete("/:certificationId", protect, deleteCertification);

export default router;
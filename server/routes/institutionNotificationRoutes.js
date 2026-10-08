import express from "express";
import {
  getInstitutionNotifications,
  getInstitutionNotificationById,
  markInstitutionNotificationAsRead,
  markAllInstitutionNotificationsAsRead,
  deleteInstitutionNotification,
} from "../controllers/institutionNotificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("institution"),
  getInstitutionNotifications
);

router.get(
  "/:notificationId",
  protect,
  allowRoles("institution"),
  getInstitutionNotificationById
);

router.put(
  "/:notificationId/read",
  protect,
  allowRoles("institution"),
  markInstitutionNotificationAsRead
);

router.put(
  "/read-all",
  protect,
  allowRoles("institution"),
  markAllInstitutionNotificationsAsRead
);

router.delete(
  "/:notificationId",
  protect,
  allowRoles("institution"),
  deleteInstitutionNotification
);

export default router;
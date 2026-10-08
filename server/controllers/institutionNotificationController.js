import Notification from "../models/Notification.js";

const checkInstitution = (req, res) => {
  if (req.user.role !== "institution") {
    res.status(403).json({
      success: false,
      message: "Institution access required",
    });

    return false;
  }

  return true;
};

// =========================================================
// GET ALL INSTITUTION NOTIFICATIONS
// =========================================================

export const getInstitutionNotifications = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const notifications = await Notification.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      unreadCount: notifications.filter(
        (notification) => !notification.isRead
      ).length,
      notifications,
    });
  } catch (error) {
    console.error(
      "Get institution notifications error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// =========================================================
// GET SINGLE NOTIFICATION
// =========================================================

export const getInstitutionNotificationById = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const { notificationId } = req.params;

    const notification = await Notification.findOne({
      _id: notificationId,
      user: req.user.userId,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(
      "Get institution notification error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notification",
    });
  }
};

// =========================================================
// MARK SINGLE NOTIFICATION AS READ
// =========================================================

export const markInstitutionNotificationAsRead = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const { notificationId } = req.params;

    const notification = await Notification.findOne({
      _id: notificationId,
      user: req.user.userId,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error(
      "Mark institution notification as read error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

// =========================================================
// MARK ALL NOTIFICATIONS AS READ
// =========================================================

export const markAllInstitutionNotificationsAsRead = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const result = await Notification.updateMany(
      {
        user: req.user.userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(
      "Mark all institution notifications as read error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update notifications",
    });
  }
};

// =========================================================
// DELETE NOTIFICATION
// =========================================================

export const deleteInstitutionNotification = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const { notificationId } = req.params;

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      user: req.user.userId,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete institution notification error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};
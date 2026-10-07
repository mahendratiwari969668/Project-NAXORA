import StudentSettings from "../models/StudentSettings.js";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/auth.js";

const checkStudent = (req, res) => {
  if (req.user.role !== "student") {
    res.status(403).json({
      success: false,
      message: "Student access required",
    });

    return false;
  }

  return true;
};

export const getStudentSettings = async (req, res) => {
  try {
    if (!checkStudent(req, res)) return;

    let settings = await StudentSettings.findOne({
      student: req.user.userId,
    });

    if (!settings) {
      settings = await StudentSettings.create({
        student: req.user.userId,
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "Get student settings error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch student settings",
    });
  }
};

export const updateStudentSettings = async (req, res) => {
  try {
    if (!checkStudent(req, res)) return;

    const {
      notifications,
      privacy,
      preferences,
      accountStatus,
    } = req.body;

    const settings = await StudentSettings.findOneAndUpdate(
      {
        student: req.user.userId,
      },
      {
        $set: {
          ...(notifications && { notifications }),
          ...(privacy && { privacy }),
          ...(preferences && { preferences }),
          ...(accountStatus && { accountStatus }),
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Student settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error(
      "Update student settings error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update student settings",
    });
  }
};

export const changeStudentPassword = async (req, res) => {
  try {
    if (!checkStudent(req, res)) return;

    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await hashPassword(newPassword);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(
      "Change student password error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

export const deactivateStudentAccount = async (req, res) => {
  try {
    if (!checkStudent(req, res)) return;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        isActive: false,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await StudentSettings.findOneAndUpdate(
      {
        student: req.user.userId,
      },
      {
        accountStatus: "deactivated",
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Student account deactivated successfully",
    });
  } catch (error) {
    console.error(
      "Deactivate student account error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to deactivate student account",
    });
  }
};
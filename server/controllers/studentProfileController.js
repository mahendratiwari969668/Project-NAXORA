import StudentProfile from "../models/StudentProfile.js";
import User from "../models/User.js";

export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can access this profile",
      });
    }

    let profile = await StudentProfile.findOne({
      user: userId,
    });

    if (!profile) {
      profile = await StudentProfile.create({
        user: userId,
      });
    }

    return res.status(200).json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    console.error("Get student profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch student profile",
    });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can update this profile",
      });
    }

    const allowedFields = [
      "profilePhoto",
      "phone",
      "dateOfBirth",
      "gender",
      "location",
      "bio",
      "headline",
      "institute",
      "careerGoal",
      "socialLinks",
      "profileCompletion",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Update student profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update student profile",
    });
  }
};
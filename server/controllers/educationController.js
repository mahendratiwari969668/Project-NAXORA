//GET     → education list
// POST    → add education
// PUT     → update education
// DELETE  → delete education


import Education from "../models/Education.js";

import User from "../models/User.js";

const checkStudent = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return {
      valid: false,
      status: 404,
      message: "User not found",
    };
  }

  if (user.role !== "student") {
    return {
      valid: false,
      status: 403,
      message: "Only students can manage education records",
    };
  }

  return {
    valid: true,
    user,
  };
};

export const getEducation = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const education = await Education.find({
      student: userId,
    }).sort({
      startDate: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    console.error("Get education error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch education records",
    });
  }
};

export const addEducation = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const {
      institutionName,
      degree,
      fieldOfStudy,
      educationLevel,
      startDate,
      endDate,
      isCurrentlyStudying,
      grade,
      description,
    } = req.body;

    if (!institutionName || !institutionName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Institution name is required",
      });
    }

    if (!degree || !degree.trim()) {
      return res.status(400).json({
        success: false,
        message: "Degree is required",
      });
    }

    const education = await Education.create({
      student: userId,
      institutionName: institutionName.trim(),
      degree: degree.trim(),
      fieldOfStudy: fieldOfStudy?.trim() || "",
      educationLevel: educationLevel || "undergraduate",
      startDate: startDate || null,
      endDate: isCurrentlyStudying ? null : endDate || null,
      isCurrentlyStudying: Boolean(isCurrentlyStudying),
      grade: grade?.trim() || "",
      description: description?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    console.error("Add education error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add education",
    });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { educationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const education = await Education.findOne({
      _id: educationId,
      student: userId,
    });

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    const allowedFields = [
      "institutionName",
      "degree",
      "fieldOfStudy",
      "educationLevel",
      "startDate",
      "endDate",
      "isCurrentlyStudying",
      "grade",
      "description",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        education[field] = req.body[field];
      }
    }

    if (education.institutionName) {
      education.institutionName = education.institutionName.trim();
    }

    if (education.degree) {
      education.degree = education.degree.trim();
    }

    if (education.fieldOfStudy) {
      education.fieldOfStudy = education.fieldOfStudy.trim();
    }

    if (education.grade) {
      education.grade = education.grade.trim();
    }

    if (education.description) {
      education.description = education.description.trim();
    }

    if (education.isCurrentlyStudying) {
      education.endDate = null;
    }

    await education.save();

    return res.status(200).json({
      success: true,
      message: "Education updated successfully",
      education,
    });
  } catch (error) {
    console.error("Update education error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update education",
    });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { educationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const education = await Education.findOneAndDelete({
      _id: educationId,
      student: userId,
    });

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Delete education error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete education",
    });
  }
};
import Skill from "../models/Skill.js";
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
      message: "Only students can manage skills",
    };
  }

  return {
    valid: true,
    user,
  };
};

export const getSkills = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const skills = await Skill.find({
      student: userId,
    }).sort({
      category: 1,
      name: 1,
    });

    return res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch skills",
    });
  }
};

export const addSkill = async (req, res) => {
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
      name,
      category,
      level,
      yearsOfExperience,
      source,
      verified,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    const existingSkill = await Skill.findOne({
      student: userId,
      name: name.trim(),
    });

    if (existingSkill) {
      return res.status(409).json({
        success: false,
        message: "This skill already exists in your profile",
      });
    }

    const skill = await Skill.create({
      student: userId,
      name: name.trim(),
      category: category || "other",
      level: level || "beginner",
      yearsOfExperience:
        yearsOfExperience !== undefined
          ? Number(yearsOfExperience)
          : 0,
      source: source || "manual",
      verified:
        verified !== undefined
          ? Boolean(verified)
          : false,
    });

    return res.status(201).json({
      success: true,
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    console.error("Add skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add skill",
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { skillId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const skill = await Skill.findOne({
      _id: skillId,
      student: userId,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    const allowedFields = [
      "name",
      "category",
      "level",
      "yearsOfExperience",
      "source",
      "verified",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        skill[field] = req.body[field];
      }
    }

    if (skill.name) {
      skill.name = skill.name.trim();
    }

    if (skill.yearsOfExperience !== undefined) {
      skill.yearsOfExperience = Number(
        skill.yearsOfExperience
      );
    }

    await skill.save();

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update skill",
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { skillId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const skill = await Skill.findOneAndDelete({
      _id: skillId,
      student: userId,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete skill",
    });
  }
};
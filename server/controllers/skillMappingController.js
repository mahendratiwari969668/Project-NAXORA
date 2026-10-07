import SkillMapping from "../models/SkillMapping.js";
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
      message: "Only students can manage skill mapping",
    };
  }

  return {
    valid: true,
    user,
  };
};

const levelValue = {
  none: 0,
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

const calculateSkillMapping = (
  currentSkills,
  requiredSkills
) => {
  const normalizedCurrentSkills = currentSkills.map(
    (skill) => ({
      ...skill,
      name: skill.name.trim().toLowerCase(),
    })
  );

  const skillGaps = [];
  let matchedSkills = 0;

  for (const requiredSkill of requiredSkills) {
    const requiredName = requiredSkill.name
      .trim()
      .toLowerCase();

    const currentSkill = normalizedCurrentSkills.find(
      (skill) => skill.name === requiredName
    );

    const currentLevel = currentSkill?.level || "none";
    const requiredLevel =
      requiredSkill.minimumLevel || "beginner";

    if (
      levelValue[currentLevel] >=
      levelValue[requiredLevel]
    ) {
      matchedSkills += 1;
    } else {
      skillGaps.push({
        name: requiredSkill.name,
        currentLevel,
        requiredLevel,
        priority: requiredSkill.importance || "medium",
      });
    }
  }

  const matchPercentage =
    requiredSkills.length > 0
      ? Math.round(
          (matchedSkills / requiredSkills.length) * 100
        )
      : 0;

  return {
    skillGaps,
    matchPercentage,
  };
};

export const getSkillMapping = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    let mapping = await SkillMapping.findOne({
      student: userId,
    });

    return res.status(200).json({
      success: true,
      mapping,
    });
  } catch (error) {
    console.error("Get skill mapping error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch skill mapping",
    });
  }
};

export const createOrUpdateSkillMapping = async (
  req,
  res
) => {
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
      targetRole,
      targetIndustry,
      requiredSkills,
    } = req.body;

    if (!targetRole || !targetRole.trim()) {
      return res.status(400).json({
        success: false,
        message: "Target role is required",
      });
    }

    if (
      !Array.isArray(requiredSkills) ||
      requiredSkills.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one required skill is needed",
      });
    }

    const studentSkills = await Skill.find({
      student: userId,
    }).select("name level source");

    const currentSkills = studentSkills.map((skill) => ({
      name: skill.name,
      level: skill.level,
      source: skill.source || "profile",
    }));

    const cleanedRequiredSkills = requiredSkills
      .filter(
        (skill) =>
          skill &&
          skill.name &&
          skill.name.trim()
      )
      .map((skill) => ({
        name: skill.name.trim(),
        importance: skill.importance || "medium",
        minimumLevel:
          skill.minimumLevel || "beginner",
      }));

    if (cleanedRequiredSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid required skills are needed",
      });
    }

    const {
      skillGaps,
      matchPercentage,
    } = calculateSkillMapping(
      currentSkills,
      cleanedRequiredSkills
    );

    const mapping = await SkillMapping.findOneAndUpdate(
      {
        student: userId,
      },
      {
        $set: {
          targetRole: targetRole.trim(),
          targetIndustry:
            targetIndustry?.trim() || "",
          currentSkills,
          requiredSkills: cleanedRequiredSkills,
          skillGaps,
          matchPercentage,
          lastCalculatedAt: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Skill mapping calculated successfully",
      mapping,
    });
  } catch (error) {
    console.error(
      "Create/update skill mapping error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to calculate skill mapping",
    });
  }
};

export const recalculateSkillMapping = async (
  req,
  res
) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const mapping = await SkillMapping.findOne({
      student: userId,
    });

    if (!mapping) {
      return res.status(404).json({
        success: false,
        message: "Skill mapping not found",
      });
    }

    const studentSkills = await Skill.find({
      student: userId,
    }).select("name level source");

    const currentSkills = studentSkills.map((skill) => ({
      name: skill.name,
      level: skill.level,
      source: skill.source || "profile",
    }));

    const {
      skillGaps,
      matchPercentage,
    } = calculateSkillMapping(
      currentSkills,
      mapping.requiredSkills
    );

    mapping.currentSkills = currentSkills;
    mapping.skillGaps = skillGaps;
    mapping.matchPercentage = matchPercentage;
    mapping.lastCalculatedAt = new Date();

    await mapping.save();

    return res.status(200).json({
      success: true,
      message: "Skill mapping recalculated successfully",
      mapping,
    });
  } catch (error) {
    console.error(
      "Recalculate skill mapping error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to recalculate skill mapping",
    });
  }
};

export const deleteSkillMapping = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const mapping = await SkillMapping.findOneAndDelete({
      student: userId,
    });

    if (!mapping) {
      return res.status(404).json({
        success: false,
        message: "Skill mapping not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill mapping deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete skill mapping error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete skill mapping",
    });
  }
};
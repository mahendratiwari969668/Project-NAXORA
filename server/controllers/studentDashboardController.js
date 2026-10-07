import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Certification from "../models/Certification.js";
import Application from "../models/Application.js";
import Opportunity from "../models/Opportunity.js";
import LearningResource from "../models/LearningResource.js";
import Notification from "../models/Notification.js";
import SkillMapping from "../models/SkillMapping.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const [
      user,
      profile,
      skillsCount,
      projectsCount,
      certificationsCount,
      applicationsCount,
      activeApplicationsCount,
      opportunitiesCount,
      learningResourcesCount,
      unreadNotificationsCount,
      recentApplications,
      recentNotifications,
      skillMapping,
    ] = await Promise.all([
      User.findById(studentId).select(
        "firstName lastName email role"
      ),

      StudentProfile.findOne({ user: studentId }),

      Skill.countDocuments({
        student: studentId,
      }),

      Project.countDocuments({
        student: studentId,
      }),

      Certification.countDocuments({
        student: studentId,
      }),

      Application.countDocuments({
        student: studentId,
      }),

      Application.countDocuments({
        student: studentId,
        status: {
          $in: [
            "applied",
            "under-review",
            "shortlisted",
            "interview",
          ],
        },
      }),

      Opportunity.countDocuments({
        isActive: true,
      }),

      LearningResource.countDocuments({
        isActive: true,
      }),

      Notification.countDocuments({
        user: studentId,
        isRead: false,
      }),

      Application.find({
        student: studentId,
      })
        .populate(
          "opportunity",
          "title company type mode deadline"
        )
        .sort({ appliedAt: -1 })
        .limit(5),

      Notification.find({
        user: studentId,
      })
        .sort({ createdAt: -1 })
        .limit(5),

      SkillMapping.findOne({
        student: studentId,
      }).select(
        "targetRole targetIndustry matchPercentage skillGaps lastCalculatedAt"
      ),
    ]);

    res.status(200).json({
      success: true,

      dashboard: {
        user,

        profile: {
          completion: profile?.profileCompletion || 0,
          headline: profile?.headline || "",
          targetRole: profile?.careerGoal?.targetRole || "",
          targetIndustry:
            profile?.careerGoal?.targetIndustry || "",
        },

        stats: {
          skills: skillsCount,
          projects: projectsCount,
          certifications: certificationsCount,
          applications: applicationsCount,
          activeApplications: activeApplicationsCount,
          opportunities: opportunitiesCount,
          learningResources: learningResourcesCount,
          unreadNotifications: unreadNotificationsCount,
        },

        skillMapping: skillMapping || {
          targetRole: "",
          targetIndustry: "",
          matchPercentage: 0,
          skillGaps: [],
          lastCalculatedAt: null,
        },

        recentApplications,

        recentNotifications,
      },
    });
  } catch (error) {
    console.error(
      "Get student dashboard error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch student dashboard",
    });
  }
};
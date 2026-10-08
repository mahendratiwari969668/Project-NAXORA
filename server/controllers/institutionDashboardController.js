import User from "../models/User.js";
import InstitutionProfile from "../models/InstitutionProfile.js";
import StudentProfile from "../models/StudentProfile.js";
import Opportunity from "../models/Opportunity.js";

export const getInstitutionDashboard = async (req, res) => {
  try {
    if (req.user.role !== "institution") {
      return res.status(403).json({
        success: false,
        message: "Institution access required",
      });
    }

    const institutionId = req.user.userId;

    // ---------------------------------------------------------
    // INSTITUTION PROFILE
    // ---------------------------------------------------------

    const [user, profile] = await Promise.all([
      User.findById(institutionId).select(
        "firstName lastName email role isActive isVerified createdAt"
      ),

      InstitutionProfile.findOne({
        user: institutionId,
      }),
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Institution account not found",
      });
    }

    // ---------------------------------------------------------
    // STUDENTS
    // ---------------------------------------------------------

    const students = await StudentProfile.find({
      "institute.name": profile?.instituteName,
    })
      .populate(
        "user",
        "firstName lastName email isActive isVerified createdAt"
      )
      .sort({
        createdAt: -1,
      });

    const totalStudents = students.length;

    const activeStudents = students.filter(
      (student) => student.user?.isActive
    ).length;

    const verifiedStudents = students.filter(
      (student) => student.user?.isVerified
    ).length;

    // ---------------------------------------------------------
    // OPPORTUNITIES
    // ---------------------------------------------------------

    const opportunities = await Opportunity.find({
      isActive: true,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    const totalOpportunities = opportunities.length;

    // ---------------------------------------------------------
    // RECENT STUDENTS
    // ---------------------------------------------------------

    const recentStudents = students
      .slice(0, 5)
      .map((student) => ({
        _id: student._id,
        name: student.user
          ? `${student.user.firstName} ${student.user.lastName}`
          : "Unknown Student",
        email: student.user?.email || "",
        profileCompletion:
          student.profileCompletion || 0,
        isActive: student.user?.isActive || false,
        createdAt: student.createdAt,
      }));

    // ---------------------------------------------------------
    // RECENT OPPORTUNITIES
    // ---------------------------------------------------------

    const recentOpportunities = opportunities
      .slice(0, 5)
      .map((opportunity) => ({
        _id: opportunity._id,
        title: opportunity.title,
        company: opportunity.company,
        type: opportunity.type,
        mode: opportunity.mode,
        location: opportunity.location,
        deadline: opportunity.deadline,
        createdAt: opportunity.createdAt,
      }));

    // ---------------------------------------------------------
    // DASHBOARD RESPONSE
    // ---------------------------------------------------------

    return res.status(200).json({
      success: true,

      institution: {
        id: user._id,
        name:
          profile?.instituteName ||
          `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isVerified: user.isVerified,
        profileCompletion:
          profile?.profileCompletion || 0,
        verificationStatus:
          profile?.verification?.status || "pending",
      },

      stats: {
        totalStudents,
        activeStudents,
        verifiedStudents,
        totalOpportunities,
      },

      recentStudents,

      recentOpportunities,
    });
  } catch (error) {
    console.error(
      "Get institution dashboard error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch institution dashboard",
    });
  }
};
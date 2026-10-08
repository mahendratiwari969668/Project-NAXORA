import StudentProfile from "../models/StudentProfile.js";
import Education from "../models/Education.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Certification from "../models/Certification.js";

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


export const getInstitutionStudentOverview = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) return;

    const { studentId } = req.params;

    let student = await StudentProfile.findById(
      studentId
    ).populate(
      "user",
      "firstName lastName email isActive isVerified createdAt"
    );

    // If User ID was provided instead of StudentProfile ID
    if (!student) {
      student = await StudentProfile.findOne({
        user: studentId,
      }).populate(
        "user",
        "firstName lastName email isActive isVerified createdAt"
      );
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const userId = student.user?._id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "Student user account not found",
      });
    }

    const [
      education,
      skills,
      projects,
      certifications,
    ] = await Promise.all([
      Education.find({
        student: userId,
      }).sort({
        startDate: -1,
      }),

      Skill.find({
        student: userId,
      }).sort({
        createdAt: -1,
      }),

      Project.find({
        student: userId,
      }).sort({
        createdAt: -1,
      }),

      Certification.find({
        student: userId,
      }).sort({
        issueDate: -1,
      }),
    ]);

    return res.status(200).json({
      success: true,

      student: {
        profile: student,
        user: student.user,
      },

      education,
      skills,
      projects,
      certifications,

      summary: {
        totalEducation: education.length,
        totalSkills: skills.length,
        totalProjects: projects.length,
        totalCertifications: certifications.length,
        profileCompletion:
          student.profileCompletion || 0,
      },
    });
  } catch (error) {
    console.error(
      "Get institution student overview error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch student academic and skill overview",
    });
  }
  
};
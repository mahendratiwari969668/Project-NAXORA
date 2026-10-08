import Application from "../models/Application.js";
import StudentProfile from "../models/StudentProfile.js";
import InstitutionProfile from "../models/InstitutionProfile.js";
import Opportunity from "../models/Opportunity.js";

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

const getInstitutionStudentIds = async (req) => {
  const institutionProfile = await InstitutionProfile.findOne({
    user: req.user.userId,
  });

  if (!institutionProfile) {
    return {
      institutionProfile: null,
      studentIds: [],
    };
  }

  const students = await StudentProfile.find({
    "institute.name": institutionProfile.instituteName,
  }).select("user");

  const studentIds = students
    .map((student) => student.user)
    .filter(Boolean);

  return {
    institutionProfile,
    studentIds,
  };
};

// =========================================================
// GET ALL APPLICATIONS OF INSTITUTION STUDENTS
// =========================================================

export const getInstitutionApplications = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const { studentIds } = await getInstitutionStudentIds(req);

    if (!studentIds.length) {
      return res.status(200).json({
        success: true,
        count: 0,
        applications: [],
      });
    }

    const applications = await Application.find({
      student: { $in: studentIds },
    })
      .populate(
        "student",
        "firstName lastName email isActive isVerified"
      )
      .populate(
        "opportunity",
        "title company description type mode location skills experienceLevel stipend salary deadline source organizationId"
      )
      .sort({ appliedAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "Get institution applications error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch institution student applications",
    });
  }
};

// =========================================================
// GET SINGLE APPLICATION
// =========================================================

export const getInstitutionApplicationById = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const { applicationId } = req.params;

    const { studentIds } = await getInstitutionStudentIds(req);

    if (!studentIds.length) {
      return res.status(404).json({
        success: false,
        message: "No students found for this institution",
      });
    }

    const application = await Application.findById(applicationId)
      .populate(
        "student",
        "firstName lastName email isActive isVerified"
      )
      .populate(
        "opportunity",
        "title company description type mode location skills experienceLevel stipend salary deadline source organizationId"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const belongsToInstitution = studentIds.some(
      (studentId) =>
        studentId.toString() === application.student?._id?.toString()
    );

    if (!belongsToInstitution) {
      return res.status(403).json({
        success: false,
        message: "This application does not belong to an institution student",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Get institution application error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

// =========================================================
// SEARCH / FILTER APPLICATIONS
// =========================================================

export const searchInstitutionApplications = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) {
      return;
    }

    const {
      status,
      opportunityId,
      search,
    } = req.query;

    const { studentIds } = await getInstitutionStudentIds(req);

    if (!studentIds.length) {
      return res.status(200).json({
        success: true,
        count: 0,
        applications: [],
      });
    }

    const query = {
      student: { $in: studentIds },
    };

    if (status) {
      query.status = status;
    }

    if (opportunityId) {
      query.opportunity = opportunityId;
    }

    let applications = await Application.find(query)
      .populate(
        "student",
        "firstName lastName email isActive isVerified"
      )
      .populate(
        "opportunity",
        "title company description type mode location skills experienceLevel stipend salary deadline source organizationId"
      )
      .sort({ appliedAt: -1 });

    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      applications = applications.filter((application) => {
        const student = application.student;
        const opportunity = application.opportunity;

        const studentName =
          `${student?.firstName || ""} ${
            student?.lastName || ""
          }`.toLowerCase();

        const studentEmail =
          student?.email?.toLowerCase() || "";

        const opportunityTitle =
          opportunity?.title?.toLowerCase() || "";

        const companyName =
          opportunity?.company?.toLowerCase() || "";

        return (
          studentName.includes(searchTerm) ||
          studentEmail.includes(searchTerm) ||
          opportunityTitle.includes(searchTerm) ||
          companyName.includes(searchTerm)
        );
      });
    }

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "Search institution applications error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to search institution applications",
    });
  }
};
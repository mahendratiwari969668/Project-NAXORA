import StudentProfile from "../models/StudentProfile.js";
import User from "../models/User.js";

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

export const getInstitutionStudents = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) return;

    const institution = await User.findById(
      req.user.userId
    ).select("email");

    if (!institution) {
      return res.status(404).json({
        success: false,
        message: "Institution account not found",
      });
    }

    const students = await StudentProfile.find({
      "institute.name": req.query.instituteName,
    })
      .populate(
        "user",
        "firstName lastName email isActive isVerified createdAt"
      )
      .sort({
        createdAt: -1,
      });

    const formattedStudents = students.map(
      (student) => ({
        _id: student._id,
        user: student.user,
        phone: student.phone,
        location: student.location,
        headline: student.headline,
        careerGoal: student.careerGoal,
        profileCompletion:
          student.profileCompletion || 0,
        createdAt: student.createdAt,
      })
    );

    return res.status(200).json({
      success: true,
      count: formattedStudents.length,
      students: formattedStudents,
    });
  } catch (error) {
    console.error(
      "Get institution students error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch institution students",
    });
  }
};
export const getInstitutionStudentById = async (
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

    // If the provided ID is the User ID instead of
    // the StudentProfile ID, find the profile through user.
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

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error(
      "Get institution student error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
};

export const searchInstitutionStudents = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) return;

    const {
      search,
      active,
      verified,
    } = req.query;

    const students = await StudentProfile.find({})
      .populate(
        "user",
        "firstName lastName email isActive isVerified createdAt"
      )
      .sort({
        createdAt: -1,
      });

    let filteredStudents = students;

    // ---------------------------------------------------------
    // SEARCH BY NAME OR EMAIL
    // ---------------------------------------------------------

    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      filteredStudents = filteredStudents.filter(
        (student) => {
          const user = student.user;

          if (!user) {
            return false;
          }

          const fullName =
            `${user.firstName} ${user.lastName}`.toLowerCase();

          const email =
            user.email?.toLowerCase() || "";

          return (
            fullName.includes(searchTerm) ||
            email.includes(searchTerm)
          );
        }
      );
    }

    // ---------------------------------------------------------
    // FILTER BY ACTIVE STATUS
    // ---------------------------------------------------------

    if (active !== undefined) {
      const isActive = active === "true";

      filteredStudents = filteredStudents.filter(
        (student) =>
          student.user?.isActive === isActive
      );
    }

    // ---------------------------------------------------------
    // FILTER BY VERIFIED STATUS
    // ---------------------------------------------------------

    if (verified !== undefined) {
      const isVerified = verified === "true";

      filteredStudents = filteredStudents.filter(
        (student) =>
          student.user?.isVerified === isVerified
      );
    }

    const formattedStudents =
      filteredStudents.map((student) => ({
        _id: student._id,
        user: student.user,
        phone: student.phone,
        location: student.location,
        headline: student.headline,
        careerGoal: student.careerGoal,
        profileCompletion:
          student.profileCompletion || 0,
        createdAt: student.createdAt,
      }));

    return res.status(200).json({
      success: true,
      count: formattedStudents.length,
      students: formattedStudents,
    });
  } catch (error) {
    console.error(
      "Search institution students error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to search institution students",
    });
  }
};
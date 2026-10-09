import University from "../models/University.js";
import Institution from "../models/Institution.js";
import Department from "../models/Department.js";
import Course from "../models/Course.js";

// GET /api/master-data/universities
export const getUniversities = async (_req, res) => {
  try {
    const universities = await University.find({ isActive: true })
      .select("_id name code state city country type")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: universities.length,
      data: universities,
    });
  } catch (error) {
    console.error("getUniversities error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch universities",
    });
  }
};

// GET /api/master-data/universities/:universityId/institutions
// OR GET /api/master-data/institutions?universityId=...
export const getInstitutions = async (req, res) => {
  try {
    const universityId = req.params.universityId || req.query.universityId;

    const query = { isActive: true };
    if (universityId) {
      query.university = universityId;
    }

    const institutions = await Institution.find(query)
      .select("_id name code university city state")
      .populate("university", "name code")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: institutions.length,
      data: institutions,
    });
  } catch (error) {
    console.error("getInstitutions error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch colleges / institutions",
    });
  }
};

// GET /api/master-data/institutions/:institutionId/departments
// OR GET /api/master-data/departments?institutionId=...
export const getDepartments = async (req, res) => {
  try {
    const institutionId = req.params.institutionId || req.query.institutionId;

    const query = { isActive: true };
    if (institutionId) {
      query.institution = institutionId;
    }

    const departments = await Department.find(query)
      .select("_id name code institution")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    console.error("getDepartments error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
    });
  }
};

// GET /api/master-data/departments/:departmentId/courses
// OR GET /api/master-data/courses?departmentId=...&institutionId=...
export const getCourses = async (req, res) => {
  try {
    const departmentId = req.params.departmentId || req.query.departmentId;
    const institutionId = req.query.institutionId;

    const query = { isActive: true };
    if (departmentId) {
      query.department = departmentId;
    }
    if (institutionId) {
      query.institution = institutionId;
    }

    const courses = await Course.find(query)
      .select("_id name code degree department durationYears")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("getCourses error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

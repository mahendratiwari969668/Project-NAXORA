import User from "../models/User.js";
import CompanyProfile from "../models/CompanyProfile.js";
import Opportunity from "../models/Opportunity.js";
import Application from "../models/Application.js";

export const getCompanyDashboard = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Company access required",
      });
    }

    const companyId = req.user.userId;

    // ---------------------------------------------------------
    // COMPANY PROFILE
    // ---------------------------------------------------------

    const [user, profile] = await Promise.all([
      User.findById(companyId).select(
        "firstName lastName email role isActive isVerified createdAt"
      ),

      CompanyProfile.findOne({
        user: companyId,
      }),
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Company account not found",
      });
    }

    // ---------------------------------------------------------
    // COMPANY OPPORTUNITIES
    // ---------------------------------------------------------

    const opportunities = await Opportunity.find({
      organizationId: companyId,
      source: "company",
    }).sort({
      createdAt: -1,
    });

    const opportunityIds = opportunities.map(
      (opportunity) => opportunity._id
    );

    // ---------------------------------------------------------
    // APPLICATIONS
    // ---------------------------------------------------------

    const applications = await Application.find({
      opportunity: {
        $in: opportunityIds,
      },
    })
      .populate(
        "student",
        "firstName lastName email"
      )
      .populate(
        "opportunity",
        "title type mode deadline"
      )
      .sort({
        appliedAt: -1,
      });

    // ---------------------------------------------------------
    // OPPORTUNITY STATS
    // ---------------------------------------------------------

    const totalOpportunities = opportunities.length;

    const activeOpportunities = opportunities.filter(
      (opportunity) => opportunity.isActive
    ).length;

    const inactiveOpportunities =
      totalOpportunities - activeOpportunities;

    // ---------------------------------------------------------
    // APPLICATION STATS
    // ---------------------------------------------------------

    const totalApplications = applications.length;

    const applicationStats = {
      applied: 0,
      underReview: 0,
      shortlisted: 0,
      interview: 0,
      selected: 0,
      rejected: 0,
      withdrawn: 0,
    };

    applications.forEach((application) => {
      switch (application.status) {
        case "applied":
          applicationStats.applied++;
          break;

        case "under-review":
          applicationStats.underReview++;
          break;

        case "shortlisted":
          applicationStats.shortlisted++;
          break;

        case "interview":
          applicationStats.interview++;
          break;

        case "selected":
          applicationStats.selected++;
          break;

        case "rejected":
          applicationStats.rejected++;
          break;

        case "withdrawn":
          applicationStats.withdrawn++;
          break;

        default:
          break;
      }
    });

    // ---------------------------------------------------------
    // RECENT DATA
    // ---------------------------------------------------------

    const recentOpportunities = opportunities
      .slice(0, 5)
      .map((opportunity) => ({
        _id: opportunity._id,
        title: opportunity.title,
        type: opportunity.type,
        mode: opportunity.mode,
        location: opportunity.location,
        isActive: opportunity.isActive,
        deadline: opportunity.deadline,
        createdAt: opportunity.createdAt,
      }));

    const recentApplications = applications
      .slice(0, 5)
      .map((application) => ({
        _id: application._id,
        status: application.status,
        appliedAt: application.appliedAt,
        student: application.student,
        opportunity: application.opportunity,
      }));

    // ---------------------------------------------------------
    // DASHBOARD RESPONSE
    // ---------------------------------------------------------

    return res.status(200).json({
      success: true,

      company: {
        id: user._id,
        name: profile?.companyName || `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isVerified: user.isVerified,
        profileCompletion: profile?.profileCompletion || 0,
        verificationStatus:
          profile?.verification?.status || "pending",
      },

      stats: {
        totalOpportunities,
        activeOpportunities,
        inactiveOpportunities,
        totalApplications,
      },

      applicationStats,

      recentOpportunities,

      recentApplications,
    });
  } catch (error) {
    console.error(
      "Get company dashboard error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch company dashboard",
    });
  }
};

export const searchCompanyApplications = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const {
      status,
      opportunityId,
      search,
    } = req.query;

    const companyOpportunities = await Opportunity.find({
      organizationId: req.user.userId,
      source: "company",
    }).select("_id");

    const opportunityIds = companyOpportunities.map(
      (opportunity) => opportunity._id.toString()
    );

    if (
      opportunityId &&
      !opportunityIds.includes(opportunityId)
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this opportunity",
      });
    }

    const query = {
      opportunity: opportunityId
        ? opportunityId
        : { $in: opportunityIds },
    };

    if (status) {
      query.status = status;
    }

    let applications = await Application.find(query)
      .populate(
        "student",
        "firstName lastName email"
      )
      .populate(
        "opportunity",
        "title company type mode deadline"
      )
      .sort({
        appliedAt: -1,
      });

    if (search && search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      applications = applications.filter((application) => {
        const student = application.student;

        if (!student) {
          return false;
        }

        const fullName =
          `${student.firstName} ${student.lastName}`.toLowerCase();

        const email =
          student.email?.toLowerCase() || "";

        return (
          fullName.includes(searchTerm) ||
          email.includes(searchTerm)
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
      "Search company applications error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to search company applications",
    });
  }
};
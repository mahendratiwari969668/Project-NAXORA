import Application from "../models/Application.js";
import Opportunity from "../models/Opportunity.js";

const checkCompany = (req, res) => {
  if (req.user.role !== "company") {
    res.status(403).json({
      success: false,
      message: "Company access required",
    });

    return false;
  }

  return true;
};

export const getCompanyApplications = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const companyOpportunities = await Opportunity.find({
      organizationId: req.user.userId,
      source: "company",
    }).select("_id");

    const opportunityIds = companyOpportunities.map(
      (opportunity) => opportunity._id
    );

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
        "title company type mode deadline"
      )
      .sort({
        appliedAt: -1,
      });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(
      "Get company applications error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch company applications",
    });
  }
};

export const getCompanyApplicationById = async (
  req,
  res
) => {
  try {
    if (!checkCompany(req, res)) return;

    const { applicationId } = req.params;

    const application = await Application.findById(
      applicationId
    )
      .populate(
        "student",
        "firstName lastName email"
      )
      .populate(
        "opportunity",
        "title company type mode deadline organizationId"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.opportunity.organizationId?.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this application",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Get company application error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

export const updateCompanyApplicationStatus = async (
  req,
  res
) => {
  try {
    if (!checkCompany(req, res)) return;

    const { applicationId } = req.params;
    const { status, notes } = req.body;

    const allowedStatuses = [
      "applied",
      "under-review",
      "shortlisted",
      "interview",
      "selected",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(
      applicationId
    ).populate(
      "opportunity",
      "title company organizationId source"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.opportunity.organizationId?.toString() !==
        req.user.userId ||
      application.opportunity.source !== "company"
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this application",
      });
    }

    application.status = status;

    if (notes !== undefined) {
      application.notes = notes;
    }

    application.lastUpdatedAt = new Date();

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(
      "Update company application error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

export const searchCompanyApplications = async (
  req,
  res
) => {
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
        : {
            $in: opportunityIds,
          },
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

      applications = applications.filter(
        (application) => {
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
        }
      );
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
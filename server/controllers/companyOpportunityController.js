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

export const getCompanyOpportunities = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const opportunities = await Opportunity.find({
      organizationId: req.user.userId,
      source: "company",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      opportunities,
    });
  } catch (error) {
    console.error(
      "Get company opportunities error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch company opportunities",
    });
  }
};

export const createCompanyOpportunity = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const {
      title,
      description,
      type,
      mode,
      location,
      skills,
      experienceLevel,
      stipend,
      salary,
      applicationUrl,
      deadline,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Opportunity title is required",
      });
    }

    const opportunity = await Opportunity.create({
      title,
      company: req.user.firstName + " " + req.user.lastName,
      description,
      type,
      mode,
      location,
      skills,
      experienceLevel,
      stipend,
      salary,
      applicationUrl,
      deadline,
      source: "company",
      organizationId: req.user.userId,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Company opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    console.error(
      "Create company opportunity error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to create company opportunity",
    });
  }
};

export const updateCompanyOpportunity = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findOne({
      _id: opportunityId,
      organizationId: req.user.userId,
      source: "company",
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "type",
      "mode",
      "location",
      "skills",
      "experienceLevel",
      "stipend",
      "salary",
      "applicationUrl",
      "deadline",
      "isActive",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        opportunity[field] = req.body[field];
      }
    });

    await opportunity.save();

    res.status(200).json({
      success: true,
      message: "Company opportunity updated successfully",
      opportunity,
    });
  } catch (error) {
    console.error(
      "Update company opportunity error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update company opportunity",
    });
  }
};

export const deleteCompanyOpportunity = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findOneAndDelete({
      _id: opportunityId,
      organizationId: req.user.userId,
      source: "company",
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company opportunity deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete company opportunity error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete company opportunity",
    });
  }
};
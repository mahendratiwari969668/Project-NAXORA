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

export const getInstitutionOpportunities = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) return;

    const opportunities = await Opportunity.find({
      organizationId: req.user.userId,
      source: "institution",
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      opportunities,
    });
  } catch (error) {
    console.error(
      "Get institution opportunities error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch institution opportunities",
    });
  }
};

export const createInstitutionOpportunity = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) return;

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

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Opportunity title is required",
      });
    }

    const opportunity = await Opportunity.create({
      title: title.trim(),
      company: req.body.organizationName || "Institution",
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
      source: "institution",
      organizationId: req.user.userId,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message:
        "Institution opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    console.error(
      "Create institution opportunity error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create institution opportunity",
    });
  }
};

export const updateInstitutionOpportunity = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) return;

    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findOne({
      _id: opportunityId,
      organizationId: req.user.userId,
      source: "institution",
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

    return res.status(200).json({
      success: true,
      message:
        "Institution opportunity updated successfully",
      opportunity,
    });
  } catch (error) {
    console.error(
      "Update institution opportunity error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update institution opportunity",
    });
  }
};

export const deleteInstitutionOpportunity = async (
  req,
  res
) => {
  try {
    if (!checkInstitution(req, res)) return;

    const { opportunityId } = req.params;

    const opportunity =
      await Opportunity.findOneAndDelete({
        _id: opportunityId,
        organizationId: req.user.userId,
        source: "institution",
      });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Institution opportunity deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete institution opportunity error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete institution opportunity",
    });
  }
};
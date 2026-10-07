import Opportunity from "../models/Opportunity.js";

export const getOpportunities = async (req, res) => {
  try {
    const {
      type,
      mode,
      experienceLevel,
      search,
    } = req.query;

    const filter = {
      isActive: true,
    };

    if (type) {
      filter.type = type;
    }

    if (mode) {
      filter.mode = mode;
    }

    if (experienceLevel) {
      filter.experienceLevel = {
        $in: [experienceLevel, "all"],
      };
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      filter.$or = [
        { title: searchRegex },
        { company: searchRegex },
        { description: searchRegex },
        { skills: searchRegex },
        { location: searchRegex },
      ];
    }

    const opportunities = await Opportunity.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      opportunities,
      count: opportunities.length,
    });
  } catch (error) {
    console.error("Get opportunities error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch opportunities",
    });
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findOne({
      _id: opportunityId,
      isActive: true,
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    return res.status(200).json({
      success: true,
      opportunity,
    });
  } catch (error) {
    console.error("Get opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch opportunity",
    });
  }
};

export const addOpportunity = async (req, res) => {
  try {
    const {
      title,
      company,
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
      source,
      organizationId,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Opportunity title is required",
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const opportunity = await Opportunity.create({
      title: title.trim(),
      company: company.trim(),
      description: description?.trim() || "",
      type: type || "internship",
      mode: mode || "remote",
      location: location?.trim() || "",
      skills: Array.isArray(skills)
        ? skills.map((skill) => skill.trim()).filter(Boolean)
        : [],
      experienceLevel: experienceLevel || "fresher",
      stipend: stipend?.trim() || "",
      salary: salary?.trim() || "",
      applicationUrl: applicationUrl?.trim() || "",
      deadline: deadline || null,
      source: source || "company",
      organizationId: organizationId || null,
    });

    return res.status(201).json({
      success: true,
      message: "Opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    console.error("Add opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create opportunity",
    });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findById(
      opportunityId
    );

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    const allowedFields = [
      "title",
      "company",
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
      "source",
      "organizationId",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        opportunity[field] = req.body[field];
      }
    }

    if (opportunity.title) {
      opportunity.title = opportunity.title.trim();
    }

    if (opportunity.company) {
      opportunity.company = opportunity.company.trim();
    }

    if (opportunity.description) {
      opportunity.description =
        opportunity.description.trim();
    }

    if (opportunity.location) {
      opportunity.location = opportunity.location.trim();
    }

    if (opportunity.stipend) {
      opportunity.stipend = opportunity.stipend.trim();
    }

    if (opportunity.salary) {
      opportunity.salary = opportunity.salary.trim();
    }

    if (opportunity.applicationUrl) {
      opportunity.applicationUrl =
        opportunity.applicationUrl.trim();
    }

    if (Array.isArray(opportunity.skills)) {
      opportunity.skills = opportunity.skills
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    await opportunity.save();

    return res.status(200).json({
      success: true,
      message: "Opportunity updated successfully",
      opportunity,
    });
  } catch (error) {
    console.error("Update opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update opportunity",
    });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findByIdAndDelete(
      opportunityId
    );

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error("Delete opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete opportunity",
    });
  }
};
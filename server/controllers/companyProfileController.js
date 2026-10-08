import CompanyProfile from "../models/CompanyProfile.js";

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

export const getCompanyProfile = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const profile = await CompanyProfile.findOne({
      user: req.user.userId,
    });

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(
      "Get company profile error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch company profile",
    });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    if (!checkCompany(req, res)) return;

    const {
      companyName,
      legalName,
      industry,
      companySize,
      foundedYear,
      website,
      logo,
      description,
      headquarters,
      contact,
      socialLinks,
    } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const profile = await CompanyProfile.findOneAndUpdate(
      {
        user: req.user.userId,
      },
      {
        user: req.user.userId,
        companyName,
        legalName,
        industry,
        companySize,
        foundedYear,
        website,
        logo,
        description,
        headquarters,
        contact,
        socialLinks,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(
      "Update company profile error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update company profile",
    });
  }
};
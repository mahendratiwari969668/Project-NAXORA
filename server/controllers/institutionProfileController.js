import InstitutionProfile from "../models/InstitutionProfile.js";

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

export const getInstitutionProfile = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) return;

    const profile = await InstitutionProfile.findOne({
      user: req.user.userId,
    });

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(
      "Get institution profile error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch institution profile",
    });
  }
};

export const updateInstitutionProfile = async (req, res) => {
  try {
    if (!checkInstitution(req, res)) return;

    const {
      instituteName,
      universityName,
      affiliation,
      institutionType,
      establishedYear,
      website,
      logo,
      description,
      location,
      contact,
      socialLinks,
    } = req.body;

    if (!instituteName) {
      return res.status(400).json({
        success: false,
        message: "Institute name is required",
      });
    }

    const profile = await InstitutionProfile.findOneAndUpdate(
      {
        user: req.user.userId,
      },
      {
        user: req.user.userId,
        instituteName,
        universityName,
        affiliation,
        institutionType,
        establishedYear,
        website,
        logo,
        description,
        location,
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
      message: "Institution profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(
      "Update institution profile error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update institution profile",
    });
  }
};
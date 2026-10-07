import Certification from "../models/Certification.js";
import User from "../models/User.js";

const checkStudent = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    return {
      valid: false,
      status: 404,
      message: "User not found",
    };
  }

  if (user.role !== "student") {
    return {
      valid: false,
      status: 403,
      message: "Only students can manage certifications",
    };
  }

  return {
    valid: true,
    user,
  };
};

export const getCertifications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const certifications = await Certification.find({
      student: userId,
    }).sort({
      issueDate: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      certifications,
    });
  } catch (error) {
    console.error("Get certifications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch certifications",
    });
  }
};

export const addCertification = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const {
      name,
      issuingOrganization,
      issueDate,
      expiryDate,
      doesNotExpire,
      credentialId,
      credentialUrl,
      description,
      skills,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Certification name is required",
      });
    }

    if (!issuingOrganization || !issuingOrganization.trim()) {
      return res.status(400).json({
        success: false,
        message: "Issuing organization is required",
      });
    }

    const certification = await Certification.create({
      student: userId,
      name: name.trim(),
      issuingOrganization: issuingOrganization.trim(),
      issueDate: issueDate || null,
      expiryDate: doesNotExpire ? null : expiryDate || null,
      doesNotExpire:
        doesNotExpire !== undefined ? Boolean(doesNotExpire) : true,
      credentialId: credentialId?.trim() || "",
      credentialUrl: credentialUrl?.trim() || "",
      description: description?.trim() || "",
      skills: Array.isArray(skills)
        ? skills.map((skill) => skill.trim()).filter(Boolean)
        : [],
    });

    return res.status(201).json({
      success: true,
      message: "Certification added successfully",
      certification,
    });
  } catch (error) {
    console.error("Add certification error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add certification",
    });
  }
};

export const updateCertification = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { certificationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const certification = await Certification.findOne({
      _id: certificationId,
      student: userId,
    });

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    const allowedFields = [
      "name",
      "issuingOrganization",
      "issueDate",
      "expiryDate",
      "doesNotExpire",
      "credentialId",
      "credentialUrl",
      "description",
      "skills",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        certification[field] = req.body[field];
      }
    }

    if (certification.name) {
      certification.name = certification.name.trim();
    }

    if (certification.issuingOrganization) {
      certification.issuingOrganization =
        certification.issuingOrganization.trim();
    }

    if (certification.credentialId) {
      certification.credentialId =
        certification.credentialId.trim();
    }

    if (certification.credentialUrl) {
      certification.credentialUrl =
        certification.credentialUrl.trim();
    }

    if (certification.description) {
      certification.description =
        certification.description.trim();
    }

    if (Array.isArray(certification.skills)) {
      certification.skills = certification.skills
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    if (certification.doesNotExpire) {
      certification.expiryDate = null;
    }

    await certification.save();

    return res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      certification,
    });
  } catch (error) {
    console.error("Update certification error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update certification",
    });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { certificationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const certification = await Certification.findOneAndDelete({
      _id: certificationId,
      student: userId,
    });

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    console.error("Delete certification error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete certification",
    });
  }
};
import Application from "../models/Application.js";
import Opportunity from "../models/Opportunity.js";
import Resume from "../models/Resume.js";
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
      message: "Only students can manage applications",
    };
  }

  return {
    valid: true,
    user,
  };
};

export const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const applications = await Application.find({
      student: userId,
    })
      .populate(
        "opportunity",
        "title company type mode location skills deadline"
      )
      .populate(
        "resumeUsed",
        "fileName originalName fileUrl"
      )
      .sort({
        appliedAt: -1,
      });

    return res.status(200).json({
      success: true,
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications",
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { applicationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
      student: userId,
    })
      .populate(
        "opportunity",
        "title company description type mode location skills deadline applicationUrl"
      )
      .populate(
        "resumeUsed",
        "fileName originalName fileUrl"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Get application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch application",
    });
  }
};

export const createApplication = async (req, res) => {
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
      opportunityId,
      coverLetter,
      resumeUsed,
      notes,
    } = req.body;

    if (!opportunityId) {
      return res.status(400).json({
        success: false,
        message: "Opportunity ID is required",
      });
    }

    const opportunity = await Opportunity.findOne({
      _id: opportunityId,
      isActive: true,
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found or no longer active",
      });
    }

    if (
      opportunity.deadline &&
      new Date(opportunity.deadline) < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed",
      });
    }

    const existingApplication = await Application.findOne({
      student: userId,
      opportunity: opportunityId,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied to this opportunity",
        application: existingApplication,
      });
    }

    let resumeId = null;

    if (resumeUsed) {
      const resume = await Resume.findOne({
        _id: resumeUsed,
        student: userId,
      });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Selected resume not found",
        });
      }

      resumeId = resume._id;
    }

    const application = await Application.create({
      student: userId,
      opportunity: opportunityId,
      coverLetter: coverLetter?.trim() || "",
      resumeUsed: resumeId,
      notes: notes?.trim() || "",
      status: "applied",
      appliedAt: new Date(),
      lastUpdatedAt: new Date(),
    });

    const populatedApplication = await Application.findById(
      application._id
    )
      .populate(
        "opportunity",
        "title company type mode location skills deadline"
      )
      .populate(
        "resumeUsed",
        "fileName originalName fileUrl"
      );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: populatedApplication,
    });
  } catch (error) {
    console.error("Create application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit application",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { applicationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
      student: userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const {
      coverLetter,
      resumeUsed,
      notes,
      status,
    } = req.body;

    if (coverLetter !== undefined) {
      application.coverLetter = coverLetter.trim();
    }

    if (notes !== undefined) {
      application.notes = notes.trim();
    }

    if (status !== undefined) {
      application.status = status;
    }

    if (resumeUsed !== undefined) {
      if (resumeUsed === null || resumeUsed === "") {
        application.resumeUsed = null;
      } else {
        const resume = await Resume.findOne({
          _id: resumeUsed,
          student: userId,
        });

        if (!resume) {
          return res.status(404).json({
            success: false,
            message: "Selected resume not found",
          });
        }

        application.resumeUsed = resume._id;
      }
    }

    application.lastUpdatedAt = new Date();

    await application.save();

    const updatedApplication = await Application.findById(
      application._id
    )
      .populate(
        "opportunity",
        "title company type mode location skills deadline"
      )
      .populate(
        "resumeUsed",
        "fileName originalName fileUrl"
      );

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update application",
    });
  }
};

export const withdrawApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { applicationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
      student: userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.status === "selected" ||
      application.status === "rejected"
    ) {
      return res.status(400).json({
        success: false,
        message: "This application cannot be withdrawn",
      });
    }

    application.status = "withdrawn";
    application.lastUpdatedAt = new Date();

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
      application,
    });
  } catch (error) {
    console.error("Withdraw application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to withdraw application",
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { applicationId } = req.params;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const application = await Application.findOneAndDelete({
      _id: applicationId,
      student: userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete application error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete application",
    });
  }
};
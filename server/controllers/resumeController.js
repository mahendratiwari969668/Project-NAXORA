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
      message: "Only students can manage resumes",
    };
  }

  return {
    valid: true,
    user,
  };
};

export const getResume = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const resume = await Resume.findOne({
      student: userId,
    });

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Get resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch resume",
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    if (!req.body.fileUrl) {
      return res.status(400).json({
        success: false,
        message: "Resume file URL is required",
      });
    }

    const resumeData = {
      student: userId,
      fileName: req.body.fileName || req.body.originalName || "",
      originalName: req.body.originalName || "",
      fileUrl: req.body.fileUrl,
      publicId: req.body.publicId || "",
      fileType: req.body.fileType || "application/pdf",
      fileSize: Number(req.body.fileSize) || 0,
      uploadedAt: new Date(),
      aiAnalysis: {
        status: "not_started",
        score: null,
        summary: "",
        analyzedAt: null,
      },
    };

    if (!resumeData.fileName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Resume file name is required",
      });
    }

    const existingResume = await Resume.findOne({
      student: userId,
    });

    let resume;

    if (existingResume) {
      resume = await Resume.findOneAndUpdate(
        { student: userId },
        {
          $set: resumeData,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      resume = await Resume.create(resumeData);
    }

    return res.status(200).json({
      success: true,
      message: existingResume
        ? "Resume updated successfully"
        : "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("Upload resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to upload resume",
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const resume = await Resume.findOneAndDelete({
      student: userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete resume",
    });
  }
};

export const updateResumeAnalysis = async (req, res) => {
  try {
    const userId = req.user.userId;

    const studentCheck = await checkStudent(userId);

    if (!studentCheck.valid) {
      return res.status(studentCheck.status).json({
        success: false,
        message: studentCheck.message,
      });
    }

    const resume = await Resume.findOne({
      student: userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const {
      status,
      score,
      summary,
    } = req.body;

    if (status !== undefined) {
      resume.aiAnalysis.status = status;
    }

    if (score !== undefined) {
      resume.aiAnalysis.score = score;
    }

    if (summary !== undefined) {
      resume.aiAnalysis.summary = summary.trim();
    }

    resume.aiAnalysis.analyzedAt =
      status === "completed" ? new Date() : resume.aiAnalysis.analyzedAt;

    await resume.save();

    return res.status(200).json({
      success: true,
      message: "Resume analysis updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update resume analysis",
    });
  }
};
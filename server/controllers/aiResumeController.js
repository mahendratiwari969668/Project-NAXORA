import Resume from "../models/Resume.js";
import {
  analyzeResumeWithAI,
} from "../services/ai/resumeAIService.js";
import {
  extractTextFromPDF,
} from "../services/pdfService.js";

const checkStudent = (req, res) => {
  if (!req.user || req.user.role !== "student") {
    res.status(403).json({
      success: false,
      message: "Only students can analyze resumes",
    });

    return false;
  }

  return true;
};

export const analyzeStudentResume = async (req, res) => {
  try {
    if (!checkStudent(req, res)) {
      return;
    }

    const { resumeText } = req.body;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required",
      });
    }

    const result = await analyzeResumeWithAI(resumeText);

    const { provider, model, analysis } = result;

    const normalizedScore =
      typeof analysis.score === "number"
        ? analysis.score
        : typeof analysis.resumeScore === "number"
        ? analysis.resumeScore
        : null;

    analysis.score = normalizedScore;
    analysis.resumeScore = normalizedScore;

    const aiAnalysis = {
      status: "completed",
      provider,
      model,
      ...analysis,
      score: normalizedScore,
      resumeScore: normalizedScore,
      analyzedAt: new Date(),
    };

    let resume = await Resume.findOne({
      student: req.user.userId,
    });

    if (!resume) {
      resume = await Resume.create({
        student: req.user.userId,
        aiAnalysis,
      });
    } else {
      resume.aiAnalysis = aiAnalysis;
      await resume.save();
    }

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      provider,
      model,
      analysis,
    });
  } catch (error) {
    console.error("AI RESUME ANALYSIS FAILED:", error.message);

    if (error.groqError) {
      console.error("Groq error:", error.groqError);
    }

    if (error.geminiError) {
      console.error("Gemini error:", error.geminiError);
    }

    return res.status(503).json({
      success: false,
      message: "All AI providers are currently unavailable",
    });
  }
};

export const uploadAndAnalyzeResume = async (req, res) => {
  try {
    if (!checkStudent(req, res)) {
      return;
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const isPdfMime =
      req.file.mimetype === "application/pdf" ||
      req.file.mimetype === "application/x-pdf";
    const isPdfExt =
      Boolean(req.file.originalname) &&
      req.file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdfMime || !isPdfExt) {
      return res.status(400).json({
        success: false,
        message: "Only PDF resume files are allowed",
      });
    }

    if (!req.file.buffer || req.file.buffer.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF file is empty",
      });
    }

    let resumeText = "";
    try {
      resumeText = await extractTextFromPDF(req.file.buffer);
    } catch (pdfError) {
      console.error("PDF text extraction failed:", pdfError.message);
      return res.status(422).json({
        success: false,
        message: "Unable to extract text from the uploaded PDF",
      });
    }

    if (!resumeText || !resumeText.trim()) {
      return res.status(422).json({
        success: false,
        message: "Unable to extract text from the uploaded PDF",
      });
    }

    const result = await analyzeResumeWithAI(resumeText);

    const { provider, model, analysis } = result;

    const normalizedScore =
      typeof analysis.score === "number"
        ? analysis.score
        : typeof analysis.resumeScore === "number"
        ? analysis.resumeScore
        : null;

    analysis.score = normalizedScore;
    analysis.resumeScore = normalizedScore;

    const aiAnalysis = {
      status: "completed",
      provider,
      model,
      ...analysis,
      score: normalizedScore,
      resumeScore: normalizedScore,
      analyzedAt: new Date(),
    };

    let resume = await Resume.findOne({
      student: req.user.userId,
    });

    if (!resume) {
      resume = await Resume.create({
        student: req.user.userId,
        originalName: req.file.originalname,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        uploadedAt: new Date(),
        aiAnalysis,
      });
    } else {
      resume.originalName = req.file.originalname;
      resume.fileName = req.file.originalname;
      resume.fileSize = req.file.size;
      resume.fileType = req.file.mimetype;
      resume.uploadedAt = new Date();
      resume.aiAnalysis = aiAnalysis;

      await resume.save();
    }

    return res.status(200).json({
      success: true,
      message: "Resume uploaded and analyzed successfully",
      file: {
        originalName: req.file.originalname,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
      },
      provider,
      model,
      analysis,
    });
  } catch (error) {
    console.error("RESUME UPLOAD AND ANALYSIS FAILED:", error.message);

    if (error.groqError) {
      console.error("Groq error:", error.groqError);
    }

    if (error.geminiError) {
      console.error("Gemini error:", error.geminiError);
    }

    return res.status(503).json({
      success: false,
      message: "All AI providers are currently unavailable",
    });
  }
};

export const getStudentResumeAnalysis = async (req, res) => {
  try {
    if (!checkStudent(req, res)) {
      return;
    }

    const resume = await Resume.findOne({
      student: req.user.userId,
    }).select(
      "aiAnalysis fileName originalName fileSize fileType uploadedAt updatedAt"
    );

    if (
      !resume ||
      !resume.aiAnalysis ||
      resume.aiAnalysis.status === "not_started"
    ) {
      return res.status(404).json({
        success: false,
        message: "No resume analysis found",
      });
    }

    return res.status(200).json({
      success: true,
      analysis: resume.aiAnalysis,
      file: {
        originalName: resume.originalName,
        fileName: resume.fileName,
        fileSize: resume.fileSize,
        fileType: resume.fileType,
        uploadedAt: resume.uploadedAt,
      },
      provider: resume.aiAnalysis.provider,
      model: resume.aiAnalysis.model,
      updatedAt: resume.updatedAt,
    });
  } catch (error) {
    console.error("Get resume analysis error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume analysis",
    });
  }
};
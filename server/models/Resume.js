import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      default: "",
      trim: true,
    },

    fileType: {
      type: String,
      default: "application/pdf",
      trim: true,
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    aiAnalysis: {
      status: {
        type: String,
        enum: ["not_started", "processing", "completed", "failed"],
        default: "not_started",
      },

      score: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },

      summary: {
        type: String,
        default: "",
        trim: true,
      },

      analyzedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
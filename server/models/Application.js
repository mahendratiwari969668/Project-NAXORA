import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "under-review",
        "shortlisted",
        "interview",
        "selected",
        "rejected",
        "withdrawn",
      ],
      default: "applied",
    },

    coverLetter: {
      type: String,
      default: "",
      trim: true,
      maxlength: 3000,
    },

    resumeUsed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  {
    student: 1,
    opportunity: 1,
  },
  {
    unique: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;
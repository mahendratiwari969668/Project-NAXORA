import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 3000,
    },

    type: {
      type: String,
      enum: [
        "internship",
        "job",
        "project",
        "hackathon",
        "competition",
        "scholarship",
        "other",
      ],
      default: "internship",
    },

    mode: {
      type: String,
      enum: [
        "remote",
        "onsite",
        "hybrid",
      ],
      default: "remote",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    experienceLevel: {
      type: String,
      enum: [
        "fresher",
        "entry",
        "mid",
        "experienced",
        "all",
      ],
      default: "fresher",
    },

    stipend: {
      type: String,
      default: "",
      trim: true,
    },

    salary: {
      type: String,
      default: "",
      trim: true,
    },

    applicationUrl: {
      type: String,
      default: "",
      trim: true,
    },

    deadline: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    source: {
      type: String,
      enum: [
        "company",
        "institution",
        "admin",
        "external",
      ],
      default: "company",
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Opportunity = mongoose.model(
  "Opportunity",
  opportunitySchema
);

export default Opportunity;
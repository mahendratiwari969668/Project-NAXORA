import mongoose from "mongoose";

const learningResourceSchema = new mongoose.Schema(
  {
    title: {
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

    provider: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "course",
        "tutorial",
        "video",
        "article",
        "documentation",
        "book",
        "project",
        "other",
      ],
      default: "course",
    },

    category: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    level: {
      type: String,
      enum: [
        "beginner",
        "intermediate",
        "advanced",
        "all",
      ],
      default: "all",
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    url: {
      type: String,
      default: "",
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
      trim: true,
    },

    isFree: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const LearningResource = mongoose.model(
  "LearningResource",
  learningResourceSchema
);

export default LearningResource;
// student automatically logged-in student ke account se connect hoga.
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "technical",
        "programming",
        "web-development",
        "database",
        "tools",
        "soft-skill",
        "other",
      ],
      default: "other",
    },

    level: {
      type: String,
      enum: [
        "beginner",
        "intermediate",
        "advanced",
        "expert",
      ],
      default: "beginner",
    },

    yearsOfExperience: {
      type: Number,
      min: 0,
      default: 0,
    },

    source: {
      type: String,
      enum: [
        "manual",
        "resume",
        "github",
        "ai",
      ],
      default: "manual",
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
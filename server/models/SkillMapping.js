import mongoose from "mongoose";

const skillMappingSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    targetIndustry: {
      type: String,
      default: "",
      trim: true,
    },

    currentSkills: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
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

          source: {
            type: String,
            enum: [
              "profile",
              "resume",
              "github",
              "manual",
              "ai",
            ],
            default: "profile",
          },
        },
      ],
      default: [],
    },

    requiredSkills: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },

          importance: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium",
          },

          minimumLevel: {
            type: String,
            enum: [
              "beginner",
              "intermediate",
              "advanced",
              "expert",
            ],
            default: "beginner",
          },
        },
      ],
      default: [],
    },

    skillGaps: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },

          currentLevel: {
            type: String,
            enum: [
              "none",
              "beginner",
              "intermediate",
              "advanced",
              "expert",
            ],
            default: "none",
          },

          requiredLevel: {
            type: String,
            enum: [
              "beginner",
              "intermediate",
              "advanced",
              "expert",
            ],
            default: "beginner",
          },

          priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium",
          },
        },
      ],
      default: [],
    },

    matchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    lastCalculatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const SkillMapping = mongoose.model(
  "SkillMapping",
  skillMappingSchema
);

export default SkillMapping;
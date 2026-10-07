import mongoose from "mongoose";

const studentSettingsSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    notifications: {
      email: {
        type: Boolean,
        default: true,
      },

      applicationUpdates: {
        type: Boolean,
        default: true,
      },

      opportunityAlerts: {
        type: Boolean,
        default: true,
      },

      learningUpdates: {
        type: Boolean,
        default: true,
      },

      skillRecommendations: {
        type: Boolean,
        default: true,
      },
    },

    privacy: {
      profileVisibility: {
        type: String,
        enum: ["public", "connections", "private"],
        default: "public",
      },

      showEmail: {
        type: Boolean,
        default: false,
      },

      showPhone: {
        type: Boolean,
        default: false,
      },
    },

    preferences: {
      language: {
        type: String,
        default: "en",
      },

      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
    },

    accountStatus: {
      type: String,
      enum: ["active", "deactivated"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const StudentSettings = mongoose.model(
  "StudentSettings",
  studentSettingsSchema
);

export default StudentSettings;
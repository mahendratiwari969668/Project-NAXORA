import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    profilePhoto: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },

    location: {
      city: {
        type: String,
        default: "",
        trim: true,
      },

      state: {
        type: String,
        default: "",
        trim: true,
      },

      country: {
        type: String,
        default: "India",
        trim: true,
      },
    },

    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    headline: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    institute: {
      name: {
        type: String,
        default: "",
        trim: true,
      },

      university: {
        type: String,
        default: "",
        trim: true,
      },

      affiliation: {
        type: String,
        default: "",
        trim: true,
      },
    },

    careerGoal: {
      targetRole: {
        type: String,
        default: "",
        trim: true,
      },

      targetIndustry: {
        type: String,
        default: "",
        trim: true,
      },

      experienceLevel: {
        type: String,
        enum: ["fresher", "entry", "mid", "experienced", ""],
        default: "",
      },
    },

    socialLinks: {
      github: {
        type: String,
        default: "",
        trim: true,
      },

      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      portfolio: {
        type: String,
        default: "",
        trim: true,
      },
    },

    profileCompletion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);

export default StudentProfile;
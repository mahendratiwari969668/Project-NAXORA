import mongoose from "mongoose";

const institutionProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    instituteName: {
      type: String,
      required: true,
      trim: true,
    },

    universityName: {
      type: String,
      default: "",
      trim: true,
    },

    affiliation: {
      type: String,
      default: "",
      trim: true,
    },

    institutionType: {
      type: String,
      enum: [
        "university",
        "college",
        "school",
        "training-institute",
        "other",
      ],
      default: "college",
    },

    establishedYear: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
      default: null,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    logo: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 3000,
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

    contact: {
      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },
    },

    socialLinks: {
      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      website: {
        type: String,
        default: "",
        trim: true,
      },
    },

    verification: {
      status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },

      verifiedAt: {
        type: Date,
        default: null,
      },
    },

    profileCompletion: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const InstitutionProfile = mongoose.model(
  "InstitutionProfile",
  institutionProfileSchema
);

export default InstitutionProfile;
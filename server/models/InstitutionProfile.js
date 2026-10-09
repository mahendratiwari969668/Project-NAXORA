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
        "institute",
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

      district: {
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

      extraAddress: {
        type: String,
        default: "",
        trim: true,
      },
    },

    authorizedPerson: {
      name: {
        type: String,
        default: "",
        trim: true,
      },
      designation: {
        type: String,
        default: "",
        trim: true,
      },
      contactNumber: {
        type: String,
        default: "",
        trim: true,
      },
    },

    supportingDocument: {
      originalName: {
        type: String,
        default: "",
        trim: true,
      },
      fileName: {
        type: String,
        default: "",
        trim: true,
      },
      fileUrl: {
        type: String,
        default: "",
        trim: true,
      },
      mimeType: {
        type: String,
        default: "",
        trim: true,
      },
      size: {
        type: Number,
        default: 0,
      },
      uploadedAt: {
        type: Date,
        default: null,
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
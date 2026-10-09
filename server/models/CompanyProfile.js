import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    legalName: {
      type: String,
      default: "",
      trim: true,
    },

    companyType: {
      type: String,
      default: "",
      trim: true,
    },

    industry: {
      type: String,
      default: "",
      trim: true,
    },

    companySize: {
      type: String,
      enum: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1001-5000",
        "5001+",
      ],
      default: "1-10",
    },

    foundedYear: {
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
      country: {
        type: String,
        default: "India",
        trim: true,
      },
      state: {
        type: String,
        default: "",
        trim: true,
      },
      district: {
        type: String,
        default: "",
        trim: true,
      },
      extraAddress: {
        type: String,
        default: "",
        trim: true,
      },
    },

    headquarters: {
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

    supportingDocument: {
      originalName: {
        type: String,
        default: "",
      },
      fileName: {
        type: String,
        default: "",
      },
      fileUrl: {
        type: String,
        default: "",
      },
      mimeType: {
        type: String,
        default: "",
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

    socialLinks: {
      linkedin: {
        type: String,
        default: "",
        trim: true,
      },
      github: {
        type: String,
        default: "",
        trim: true,
      },
      twitter: {
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
      remarks: {
        type: String,
        default: "",
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

const CompanyProfile = mongoose.model(
  "CompanyProfile",
  companyProfileSchema
);

export default CompanyProfile;
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    fileName: {
      type: String,
      required: false,
      trim: true,
    },

    originalName: {
      type: String,
      required: false,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: false,
      trim: true,
    },

    publicId: {
      type: String,
      default: "",
      trim: true,
    },

    fileType: {
      type: String,
      default: "application/pdf",
      trim: true,
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    aiAnalysis: {
      status: {
        type: String,
        enum: [
          "not_started",
          "processing",
          "completed",
          "failed",
        ],
        default: "not_started",
      },

      provider: {
        type: String,
        default: "",
      },

      model: {
        type: String,
        default: "",
      },

      resumeScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },

      score: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },

      summary: {
        type: String,
        default: "",
        trim: true,
      },

      skills: {
        type: [String],
        default: [],
      },

      softSkills: {
        type: [String],
        default: [],
      },

      experience: {
        type: [
          {
            company: {
              type: String,
              default: "",
            },
            role: {
              type: String,
              default: "",
            },
            duration: {
              type: String,
              default: "",
            },
            description: {
              type: String,
              default: "",
            },
          },
        ],
        default: [],
      },

      education: {
        type: [
          {
            institution: {
              type: String,
              default: "",
            },
            degree: {
              type: String,
              default: "",
            },
            field: {
              type: String,
              default: "",
            },
            duration: {
              type: String,
              default: "",
            },
          },
        ],
        default: [],
      },

      projects: {
        type: [
          {
            name: {
              type: String,
              default: "",
            },
            description: {
              type: String,
              default: "",
            },
            technologies: {
              type: [String],
              default: [],
            },
          },
        ],
        default: [],
      },

      certifications: {
        type: [String],
        default: [],
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      suggestedRoles: {
        type: [String],
        default: [],
      },

      skillGaps: {
        type: [String],
        default: [],
      },

      analyzedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model(
  "Resume",
  resumeSchema
);

export default Resume;
//  Isme student ki multiple education entries rahengi

import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    institutionName: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    fieldOfStudy: {
      type: String,
      default: "",
      trim: true,
    },

    educationLevel: {
      type: String,
      enum: [
        "school",
        "higher-secondary",
        "diploma",
        "undergraduate",
        "postgraduate",
        "other",
      ],
      default: "undergraduate",
    },

    startDate: {
      type: Date,
      default: null,
    },

    endDate: {
      type: Date,
      default: null,
    },

    isCurrentlyStudying: {
      type: Boolean,
      default: false,
    },

    grade: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", educationSchema);

export default Education;
const mongoose = require("mongoose");

const { Schema } = mongoose;

const JobsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    compensation: {
      type: Number,
      required: true,
    },

    is_visible: {
      type: Boolean,
      default: true,
    },
    employment_type: {
      type: Schema.Types.ObjectId,
      ref: "employment_type",
    },
    salary_preference: {
      type: Schema.Types.ObjectId,
      ref: "salary_preference",
    },
    travel_requirements: {
      type: String,
      required: true,
    },
    is_telecommute: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    skills: [
      {
        type: String,
        required: true,
      },
    ],
    candidates: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        applied_date: {
          type: Date,
          required: true,
        },
        resume_id: {
          type: Schema.Types.ObjectId,
          ref: "resumes",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobs", JobsSchema);

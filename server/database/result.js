const mongoose = require("mongoose");

const { Schema } = mongoose;

const ResultsSchema = new Schema(
  {
    candidate_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    assign_exam_id: {
      type: Schema.Types.ObjectId,
      ref: "assigned_candidates",
    },
    exam_id: {
      type: Schema.Types.ObjectId,
      ref: "exam",
    },
    questions: [
      {
        question_id: {
          type: Schema.Types.ObjectId,
          ref: "question",
          require: true,
        },
        answer: {
          type: String,
          require: true,
        },
        level: {
          type: String,
          requires: true,
        },
      },
    ],
    user_marks: {
      type: Number,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
    passing_marks: {
      type: Number,
      default: null,
    },
    is_passed: {
      type: Boolean,
      default: null,
    },
    easy_count: {
      type: Number,
    },
    medium_count: {
      type: Number,
    },
    hard_count: {
      type: Number,
    },
    easy_correct: {
      type: Number,
    },
    medium_correct: {
      type: Number,
    },
    hard_correct: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("exam_report", ResultsSchema);

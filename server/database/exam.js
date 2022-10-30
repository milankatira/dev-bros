const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExamSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },

    exam_name: {
      type: String,
      require: true,
    },

    exam_type: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    total_mark: {
      type: Number,
      require: true,
    },

    passing_mark: {
      type: Number,
      require: true,
    },

    totalQuestion: {
      type: Number,
      require: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("exam", ExamSchema);

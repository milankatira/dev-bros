const mongoose = require("mongoose");

const { Schema } = mongoose;

const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
    mcqs: [
      {
        type: String,
        require: true,
      },
    ],
    level: {
      type: String,
      require: true,
    },
    exam_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "exams",
      },
    ],
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", QuestionSchema);

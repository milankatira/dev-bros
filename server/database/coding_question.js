const mongoose = require("mongoose");

const { Schema } = mongoose;

const CodingQuestionSchema = new Schema(
  {
    question: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      require: true,
    },
    exam_id: {
      type: Schema.Types.ObjectId,
      ref: "exams",
    },
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("codingquestion", CodingQuestionSchema);

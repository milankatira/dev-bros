const mongoose = require("mongoose");

const { Schema } = mongoose;

const assigned_candidates = new Schema(
  {
    exam_id: {
      type: Schema.Types.ObjectId,
      ref: "exam",
    },
    name: {
      type: String,
    },
    date: {
      type: Date,
      require: true,
    },
    start_time: {
      type: String,
      require: true,
    },
    end_time: {
      type: String,
      require: true,
    },
    notify: {
      type: Boolean,
      default: false,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    candidate_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "candidate_group",
    },
    exam_link: {
      type: String,
      unique: true,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("assigned_candidates", assigned_candidates);

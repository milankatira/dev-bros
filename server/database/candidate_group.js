const mongoose = require("mongoose");

const { Schema } = mongoose;

const CandidategroupSchema = new Schema({
  profile_url: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  candidates: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = mongoose.model("candidate_group", CandidategroupSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const StateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
});

module.exports = mongoose.model("state", StateSchema);

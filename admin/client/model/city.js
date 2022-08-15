const mongoose = require("mongoose");

const { Schema } = mongoose;

const CitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
  },
});

mongoose.models = {};

module.exports = mongoose.model("city", CitySchema);

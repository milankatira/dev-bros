const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlansSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("plans", PlansSchema);

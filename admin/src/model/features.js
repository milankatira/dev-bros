const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
  showPlusButton: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("features", FeatureSchema);

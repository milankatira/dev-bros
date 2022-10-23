const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("designation", DesignationSchema);

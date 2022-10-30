const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("institution", UniversitySchema);

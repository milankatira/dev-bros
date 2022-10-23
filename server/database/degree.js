const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DegreeSchema = new Schema({
  department: {
    type: String,
    required: true,
  },
  certification: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("degree", DegreeSchema);

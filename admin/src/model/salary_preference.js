const mongoose = require("mongoose");

const { Schema } = mongoose;

const SalarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("salary_preference", SalarySchema);

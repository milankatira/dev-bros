const mongoose = require('mongoose');

const EmploymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('employment_type', EmploymentTypeSchema);

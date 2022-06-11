const mongoose = require('mongoose');

const { Schema } = mongoose;

const EducationDetailsSchema = new Schema({
  degree: {
    type: Schema.Types.ObjectId,
    ref: 'degree',
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'institution',
  },
  description: {
    type: String,
    required: true,
  },
  started_year: {
    type: Date,
    required: true,
  },
  passing_year: {
    type: Date,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = mongoose.model('education_details', EducationDetailsSchema);

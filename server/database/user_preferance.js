const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserProfileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  employment_type: {
    type: Schema.Types.ObjectId,
    ref: 'employment_type',
  },
  expected_salary: {
    type: Number,
    required: true,
  },
  salary_preference: {
    type: String,
    required: true,
  },
  willing_to_relocate: {
    type: Boolean,
    default: false,
  },
  prefered_location: [{
    type: Schema.Types.ObjectId,
    ref: 'city',
  }],
});

module.exports = mongoose.model('user_preference', UserProfileSchema);

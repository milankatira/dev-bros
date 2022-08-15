const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfessionalExperienceSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  company: {
    type: String,
  },
  designation: {
    type: Schema.Types.ObjectId,
    ref: 'designation',
  },
  description: {
    type: String,
    required: true,
  },
  start_at: {
    type: Date,
    required: true,
  },
  end_at: {
    type: Date,
    required: false,
  },
  is_current_employement: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('professional_experience', ProfessionalExperienceSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const SkillsSchema = new Schema({
  skill: {
    type: Schema.Types.ObjectId,
    ref: 'skills',
  },
  year_of_experience: {
    type: Number,
    required: true,
  },
  last_used: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = mongoose.model('user_skills', SkillsSchema);

const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('skills', SkillsSchema);

const mongoose = require('mongoose');

const SubcriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  tenture: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model('subcription_plans', SubcriptionSchema);

const mongoose = require('mongoose');

const UserRollsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user_rolls', UserRollsSchema);

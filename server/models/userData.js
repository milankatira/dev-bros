const mongoose = require('mongoose');

const { Schema } = mongoose;

const userDataSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  
});

module.exports = mongoose.model('userData', userDataSchema);

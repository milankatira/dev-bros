const mongoose = require('mongoose');

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: [{
    street: {
      type: String,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'city',
    }
  }],
  description: {
    type: String,
    required: true,
  },
  company_url: {
    type: String,
  },
  logo: {
    type: String,
    required: true,
  },
  cover_picture: {
    type: String,
  },
  number_of_eployees: {
    type: Number,
    required: true,
  },
  foundation_year: {
    type: String,
    required: true,
  },
  headquter: {
    type: Schema.Types.ObjectId,
    ref: 'city',
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
});

module.exports = mongoose.model('company', CompanySchema);

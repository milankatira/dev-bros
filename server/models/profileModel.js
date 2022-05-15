const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profile_pic: {
    type: String,
    required: [true, "please enter profile pic"],
  },
  location: {
    type: String,
    required: [true, "please enter location"],
  },
  user_id:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Profile", profileSchema);

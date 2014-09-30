// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var UserSchema   = new mongoose.Schema({
  name: String,
  email: String,
  dob: Date, // Date of Birth
  gender: String,
  device_id: String,
  facebook_id: String,
  abuse_flag: Boolean,
  last_login_time: Date
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
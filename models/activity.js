// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ActivitySchema   = new mongoose.Schema({
  name: String,
  video_url: String,
  instruction: String
});

// Export the Mongoose model
module.exports = mongoose.model('Activity', ActivitySchema);
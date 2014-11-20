// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var VideoSchema   = new mongoose.Schema({
  user_id: String,
  activity_id: String,
  vendor_id: String, 
  video_url: String,
  timestamp: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Video', VideoSchema);
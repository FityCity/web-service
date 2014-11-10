// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var PointsSchema   = new mongoose.Schema({
  user_id: String,
  vendor_id: String,
  points: Number,
});

// Export the Mongoose model
module.exports = mongoose.model('Points', PointsSchema);
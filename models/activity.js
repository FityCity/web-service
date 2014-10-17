// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ActivitySchema = new mongoose.Schema({
  title: String,
  youtube_id: String,
  instructions: String,
  difficulty:String
});

// Export the Mongoose model
module.exports = mongoose.model('Activity', ActivitySchema);
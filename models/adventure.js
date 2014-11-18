// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var AdventureSchema = new mongoose.Schema({
  title: String,
  description: String,
  image_url: String,
  date: String,
  time: String,
  venue: String,
  cost: Number,
  category: String
});

// Export the Mongoose model
module.exports = mongoose.model('Adventure', AdventureSchema);
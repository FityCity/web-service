// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var OfferSchema   = new mongoose.Schema({
  points: Number,
  description: String,
  vendor_id: String
});

// Export the Mongoose model
module.exports = mongoose.model('Offer', OfferSchema);
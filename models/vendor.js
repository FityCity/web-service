// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var VendorSchema   = new mongoose.Schema({
  name: String,
  image_url: String,
  address: String,	//GPS location
  offers: Array
});

// Export the Mongoose model
module.exports = mongoose.model('Vendor', VendorSchema);
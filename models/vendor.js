// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var VendorSchema   = new mongoose.Schema({
  name: String,
  address: String,
  image_url: String,
  location:String 		//GPS location
});

// Export the Mongoose model
module.exports = mongoose.model('Vendor', VendorSchema);
// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var DeviceSchema   = new mongoose.Schema({
  device_id: String
});

// Export the Mongoose model
module.exports = mongoose.model('Device', DeviceSchema);
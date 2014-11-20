// Load required packages
var mongoose = require('mongoose');
var AppUser=require('./appuser');
var Vendor=require('./vendor');

// Define our beer schema
var PointsSchema   = new mongoose.Schema({
  user_id: {
  	type:String,
  	ref:'AppUser'
  },
  vendor_id: {
  	type:String,
  	ref:'Vendor'
  },
  points: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Points', PointsSchema);
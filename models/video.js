// Load required packages
var mongoose = require('mongoose');
var Activity=require('./activity');
var AppUser=require('./appuser');
var Vendor=require('./vendor')

// Define our beer schema
var VideoSchema   = new mongoose.Schema({
  user_id: {
  	type:String,
  	ref:'AppUser'
  },
  activity_id: {
  	type:String,
  	ref:'Activity'
  },
  vendor_id: {
  	type:String,
  	ref:'Vendor' 
  },
  video_url: String,
  timestamp: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Video', VideoSchema);
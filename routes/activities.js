var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');
var authCtrl = require('./auth');

var activitiesRoute = router.route('/');


/*  GET: activities  */
activitiesRoute.get(authCtrl.isAuthenticated, function(req, res) {

  activity.find(function(err, activities) {
    if (err){
      res.send(err);
    }
    res.json(activities);
  });
});


 /*  POST: activities  */
activitiesRoute.post(authCtrl.isAuthenticated, function(req, res) {

  // Create a new instance of the activity model
  var activity = new Activity();

  // Set the activity properties that came from the POST data
  activity.name = req.body.name;
  activity.video_url = req.body.video_url;
  activity.instruction = req.body.instruction;

  // Save the activity and check for errors
  activity.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'activity added!', data: activity });
  });
});


module.exports = router;

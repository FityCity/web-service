var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');
var authCtrl = require('./auth');

var activitiesRoute = router.route('/');


/*  GET: activities  */
activitiesRoute.get(authCtrl.isAuthenticated, function(req, res) {

  Activity.find(function(err, activities) {
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
  activity.title = req.body.title;
  activity.youtube_id = req.body.youtube_id;
  activity.instructions = req.body.instructions;
  activity.difficulty = req.body.difficulty;

  // Save the activity and check for errors
  activity.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'activity added!', data: activity });
  });
});

// Create endpoint /api/beers/:beer_id for DELETE
activitiesRoute.delete(authCtrl.isAuthenticated, function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  // console.log(req);
  Activity.findByIdAndRemove(req.query.activity_id, function(err) {
    if (err){
      res.send(err);
    }

    res.json({ message: 'Activity removed!' });
  });
});


module.exports = router;

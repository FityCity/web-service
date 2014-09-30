var express = require('express');
var router = express.Router();
var User = require('../models/user');

var authCtrl = require('./auth');
var usersRoute = router.route('/');

/*  GET: users  */
usersRoute.get(function(req, res) {

  User.find(function(err, users) {
    if (err){
      res.send(err);
    }
    res.json({user:req.user.username,data:users});
  });
});


 /*  POST: users  */
usersRoute.post(function(req, res) {

  // Create a new instance of the User model
  var user = new User();

  // Set the user properties that came from the POST data
  user.name = req.body.name;
  user.device_id = req.body.device_id;
  user.facebook_id = req.body.facebook_id;
  user.last_login_time = Date();

  // Save the user and check for errors
  user.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'User added!', data: user });
  });
});


module.exports = router;

app=require('../app')
var User = require('../models/user');

/*  GET: users  */
app.get('/users',function(req,res){
	User.find(function(err, users) {
    if (err){
      res.send(err);
    }
    res.json(users);
  });

})


 /*  POST: users  */
app.post('/users',function(req,res){
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
})
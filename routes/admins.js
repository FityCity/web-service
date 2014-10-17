app=require('../app')
var Admin = require('../models/admin');

app.get('/admins',function(req,res){
  Admin.find(function(err, admins) {
    if (err){
      res.send(err);
    }
    res.json(admins);
  });

})

 /*  POST: admins  */
app.post('/admins',function(req,res){
  // Create a new instance of the admin model
  var admin = new Admin();

  // Set the admin properties that came from the POST data
  admin.username = req.body.username;
  admin.password = req.body.password;

  // Save the admin and check for errors
  admin.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'admin added!', data: admin });
  });

})

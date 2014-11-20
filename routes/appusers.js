app=require('../app')
var AppUser = require('../models/appuser');

/*  GET: users  */
app.get('/appUsers/datatable',function(req,res){
	AppUser.find(function(err, appUsers) {
    if (err){
      res.send(err);
    }
    res.json({data:appUsers});
  });

})
app.get('/appUsers',function(req,res){
  AppUser.find(function(err, appUsers) {
    if (err){
      res.send(err);
    }
    res.json(appUsers);
  });

})



app.get('/appUsers/:appUser_id',function(req,res){
  AppUser.findById(req.params.appUser_id,function(err, appUser) {
    if (err){
      res.send(err);
    }
    res.json(appUser);
  });

})


 /*  POST: users  */
app.post('/appUsers',function(req,res){
	// Create a new instance of the User model
  var appUser = new AppUser();

  // Set the user properties that came from the POST data
  appUser.name = req.body.name;
  appUser.device_id = req.body.device_id;
  appUser.facebook_id = req.body.facebook_id;
  appUser.gender=req.body.gender;
  appUser.image_url=req.body.image_url;
  appUser.email=req.body.email;
  appUser.dob=req.body.dob;
  appUser.last_login_time = Date();
  // Save the user and check for errors
  appUser.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'app users added!', data: appUser });
  });
})

/* Delete:subscriber*/
app.delete('/appUsers/:appUser_id',function(req,res){
  AppUser.findByIdAndRemove(req.params.appUser_id, function(err) {
    if (err){
      res.send(err);
    } else{
      res.json({message:req.params.appUser_id + " deleted."});
    };
  });
})
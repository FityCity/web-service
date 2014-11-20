app=require('../app')
var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');


app.post('/login',function(req,res){
  sess=req.session
  var username=req.body.username;
  var password=req.body.password;
  Admin.findOne({username:username},function(err,user){
    if (err||!user) { 
      console.log("not found")
      res.json({success:false}); 
    }
    else{
          // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if(isMatch){
          sess.user=user;
          cookies=req.cookies.user
          if(!cookies){
            var loginUser=new Object();
            loginUser.username=user.username
            loginUser.role=user.role
            res.cookie('user',JSON.stringify(loginUser),{ maxAge: 3600000, httpOnly: false });
          }
          res.json({success:true,user:user})
        }
        else{
          res.json({success:false})
        }
      });
    }


  })
})
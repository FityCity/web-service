// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Admin = require('../models/admin');


passport.use(new BasicStrategy(
  function(username, password, callback) {
    Admin.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.isAuthenticated = passport.authenticate('basic', { session : true });

var crypto = require('crypto'),
    bucket = "fitecity",
    awsKey = process.env.S3_KEY,
    secret = process.env.S3_SECRET;

function sign(req, res, next) {
 
    var fileName = req.body.fileName,
        expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString();
 
    var policy =
    { "expiration": expiration,
        "conditions": [
            {"bucket": bucket},
            {"key": fileName},
            {"acl": 'public-read'},
            ["starts-with", "$Content-Type", "video/mp4"]
        ]};
 
    var policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
    var signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');
    res.json({
      bucket: bucket, 
      awsKey: awsKey, 
      policy: policyBase64, 
      signature: signature
    });
 
}
 
// DON'T FORGET TO SECURE THIS ENDPOINT WITH APPROPRIATE AUTHENTICATION/AUTHORIZATION MECHANISM
app.post('/policies', sign);



app=require('../app')
var Video = require('../models/video');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs = require('fs');

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_KEY, 
  secretAccessKey: process.env.AWS_SECRET
});
var s3 = new AWS.S3();

var S3_DNS = "https://s3.amazonaws.com";


var User = require('../models/user');

/*  GET: videos by user_id  */
app.get('/videos',function(req,res){
  console.log("Videos page");
	Video.find({user_id:req.params.user_id}, function(err, videos) {
    if (err){
      res.send(err);
    }
    res.json(videos);
  });
});

app.get('/videos/all',function(req,res){
  Video.find(function(err, videos) {
    if (err){
      res.send(err);
    }
    res.json(videos);
  });
});


/*  GET: video by video_id  */
app.get('/videos/:video_id',function(req,res){
  Video.findById(req.params.video_id, function(err, video) {
    if (err){
      res.send(err);
    }
    res.json(video);
  });
});


 /*  POST: users  */
app.post('/videos',function(req,res){

  console.log(req);

	// Create a new instance of the User model
  var video = new Video();

  // Set the user properties that came from the POST data
  video.user_id = req.body.user_id;
  video.activity_id = req.body.activity_id;
  video.vendor_id = req.body.vendor_id;
  video.timestamp = new Date();

  var s3_bucket = 'fitecity'
  var s3_path = video.vendor_id + "/" + 
                video.activity_id + "/" +
                video.user_id + "/" +
                video.timestamp + ".mp4"

  video.video_url = S3_DNS + "/" + s3_bucket + '/' + s3_path;


  var file = req.files.file;
  var content = fs.readFileSync(file.path);
  var params = {
    Bucket: s3_bucket, /* required */
    Key: s3_path, /* required */
    ACL: 'public-read',
    ContentType: "video/mp4",
    Body: content
  };


  s3.putObject(params, function (err, res) {
      if (err) {
        return res.send(500, err);
      }

      //Save the video and check for errors
      video.save(function(err) {
        if (err){
          res.send(err);
        }
        res.json({ message: 'video added!', data: video });
      });
      
    });

  
})

app=require('../app')
var Video = require('../models/video');
var Activity=require('../models/activity');
var Vendor=require('../models/vendor');
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

/*  GET: videos by user_id for admin console */
app.get('/videos/datatable/:user_id',function(req,res){
  console.log(req.params)
  Video.find({user_id:req.params.user_id}).populate('user_id activity_id vendor_id').exec(function(err,videos){
    var result={}
    var videosData=[]
    for(var i=0;i<videos.length;i++){
      elem={}
      elem._id=videos[i]._id
      elem.name=videos[i].user_id.name;
      elem.activity=videos[i].activity_id.title;
      elem.vendor=videos[i].vendor_id.name;
      elem.video_url=videos[i].video_url;
      elem.timestamp=videos[i].timestamp;
      videosData.push(elem)
    }
    result.data=videosData;
    res.json(result)
  })
});

/*  GET: all videos  */
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



	// Create a new instance of the User model
  var video = new Video();

  // Set the user properties that came from the POST data
  video.user_id = req.body.user_id;
  video.activity_id = req.body.activity_id;
  video.vendor_id = req.body.vendor_id;
  video.timestamp = req.body.timestamp
  var s3_bucket = 'fitecity'
  var s3_path = video.vendor_id + "/" + 
                video.activity_id + "/" +
                video.user_id + "/" +
                req.body.timestamp

  video.video_url = S3_DNS + "/" + s3_bucket + '/' + s3_path;
  //Save the video and check for errors
  video.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'video added!', data: video });
  });


  
})

/*  UPDATE: vendor  */
app.put('/videos',function(req,res){
  Video.findById(req.body._id, function(err, video) {
    if (err){
      res.send(err);
    }

    console.log(req.body.user_id)
    console.log(video)
    // Change a property here
    video.user_id = req.body.user_id;
    video.activity_id = req.body.activity_id;
    video.vendor_id=req.body.vendor_id;
    video.video_url=req.body.video_url;
    video.timestamp=req.body.timestamp;

    // Save the beer and check for errors
    video.save(function(err) {
      if (err){
        res.send(err);
      }

      res.json(video);
    });
  });
})

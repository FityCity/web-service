app=require('../app')
var Activity = require('../models/activity');

app.get('/activities',function(req,res){
  Activity.find(function(err, activities) {
    if (err){
      res.send(err);
    }
    res.json(activities);
  });

})

app.post('/activities',function(req,res){
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
})

/*  UPDATE: activity  */
app.put('/activities',function(req,res){
  Activity.findById(req.body._id, function(err, activity) {
    if (err){
      res.send(err);
    }
    // Change a property here
    activity.title = req.body.title;
    activity.youtube_id = req.body.youtube_id;
    activity.instructions=req.body.instructions;
    activity.difficulty=req.body.difficulty;

    // Save the beer and check for errors
    activity.save(function(err) {
      if (err){
        res.send(err);
      }
      res.json(activity);
    });
  });
})

/*  DELETE: activity  */
app.delete('/activities/:activity_id',function(req,res){
  Activity.findByIdAndRemove(req.params.activity_id, function(err) {
    if (err){
      res.send(err);
    } else{
      res.json({message:req.params.activity_id + " deleted."});
    };
  });
})
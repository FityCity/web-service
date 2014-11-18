app=require('../app')
var Adventure = require('../models/adventure');

console.log(Adventure);
/*  GET: adventures  */
app.get('/adventures',function(req,res){
	Adventure.find(function(err, adventures) {
    if (err){
      res.send(err);
    }
    res.json(adventures);
  });

});


 /*  POST: adventures  */
app.post('/adventures',function(req,res){
	// Create a new instance of the Adventure model
  var adventure = new Adventure();

  // Set the Adventure properties that came from the POST data
  adventure.title = req.body.title;
  adventure.description = req.body.description;
  adventure.image_url = req.body.image_url;
  adventure.date = req.body.date;
  adventure.time = req.body.time;
  adventure.venue = req.body.venue;
  adventure.cost = req.body.cost;
  adventure.category = req.body.category;

  // Save the Adventure and check for errors
  adventure.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'Adventure added!', data: adventure });
  });
});

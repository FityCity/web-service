var Point = require('../models/points');
app=require('../app')

/*  GET: vendors  */
app.get('/points',function(req,res){
  Point.find(function(err, points) {
    if (err){
      res.send(err);
    }
    res.json(points);
  });
})


 /*  POST: vendors  */
app.post('/points',function(req,res){
  // Create a new instance of the vendor model
  var point = new Point();

  // Set the vendor properties that came from the POST data
  point.user_id = req.body.user_id;
  point.vendor_id = req.body.vendor_id;
  point.points=req.body.points;

  // Save the vendor and check for errors
  point.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ data: point });
  });
})


/*  DELETE: vendor  */
app.delete('/points/:point_id',function(req,res){
  Point.findByIdAndRemove(req.params.point_id, function(err) {
    if (err){
      res.send(err);
    } else{
      res.json({message:req.params.point_id + " deleted."});
    };
  });
})


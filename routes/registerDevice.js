app=require('../app')
var Device = require('../models/device')

/*  GET: vendors  */
app.post('/register',function(req,res){
  var device = new Device();

  // Set the vendor properties that came from the POST data
  device.device_id = req.body.device_id;
  // Save the vendor and check for errors
  device.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ data: device });
  });
})


app=require('../app')
var Subscriber = require('../models/subscriber');

/*  GET: users  */
app.get('/subscribers',function(req,res){
	Subscriber.find(function(err, subscribers) {
    if (err){
      res.send(err);
    }
    res.json(subscribers);
  });

})


 /*  POST: users  */
app.post('/subscribers',function(req,res){
	// Create a new instance of the User model
  var subscriber = new Subscriber();
  console.log(req)
  // Set the user properties that came from the POST data
  subscriber.name = req.body.name;
  subscriber.device_id = req.body.device_id;
  subscriber.facebook_id = req.body.facebook_id;
  subscriber.last_login_time = Date();
  // Save the user and check for errors
  subscriber.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'subscribers added!', data: subscriber,request:req.body });
  });
})

/* Delete:subscriber*/
app.delete('/subscribers/:subscriber_id',function(req,res){
  Subscriber.findById(req.params.subscriber_id, function(err, subscriber) {
    if (err)
      res.send(err);

    // Save the beer and check for errors
    vendor.(function(err) {
      if (err)
        res.send(err);

      res.json(vendor);
    });
  });
})
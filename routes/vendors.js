var Vendor = require('../models/vendor');
var gcm = require('node-gcm');
app=require('../app')

var SendPushNotification = function(){
// create a message with default values
// var message = new gcm.Message();

// or with object values
  // var message = new gcm.Message({
  //     collapseKey: 'demo',
  //     delayWhileIdle: true,
  //     timeToLive: 3,
  //     data: {
  //         key1: 'message1',
  //         key2: 'message2'
  //     }
  // });
  var message = new gcm.Message();
  message.addData('title','My Game');
  message.addData('message','Your turn!!!!');
  message.addData('msgcnt','1');
  message.collapseKey = 'demo';
  message.delayWhileIdle = true;
  message.timeToLive = 3;
  var sender = new gcm.Sender('AIzaSyCCk573UlttBoU6mPvzwsAQ1UwejxSggD4');
  var registrationIds = [];

// OPTIONAL
// add new key-value in data object
//message.addDataWithKeyValue('key1','message1');
//message.addDataWithKeyValue('key2','message2');

// or add a data object
//message.addDataWithObject({
//    key1: 'message1',
//    key2: 'message2'
//});

// or with backwards compatibility of previous versions
//message.addData('key1','message1');
//message.addData('key2','message2');

  // END OPTIONAL
  var Lee_regid = 'APA91bF-aiZfkPwGJCz_pC2Scfr1DuE5UX8TqN16WFggZk7xB1Rj1_H0OYWESNvCD3XvsYp7hI4zeZWYQb-v2k83egAGhFVxBzrNFkPgcbNbkk9fzjcxpwu6bPphDLIKirO4J-cbqgkVuBlE-HHq7NIxna2aaZYfOYq5NnJj_uABIk_XwHJDvXw';
  // At least one required
  registrationIds.push(Lee_regid);
  sender.send(message, registrationIds, 4, function (err, result) {
      console.log("err:"+err)
      console.log("result:"+result);
  });
}


/*  GET: vendors  */
app.get('/vendors',function(req,res){
  Vendor.find(function(err, vendors) {
    if (err){
      res.send(err);
    }
    res.json(vendors);
  });
})


 /*  POST: vendors  */
app.post('/vendors',function(req,res){
  // Create a new instance of the vendor model
  var vendor = new Vendor();

  // Set the vendor properties that came from the POST data
  vendor.name = req.body.name;
  vendor.address = req.body.address;
  vendor.image_url=req.body.image_url;
  vendor.location=req.body.location;

  // Save the vendor and check for errors
  vendor.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ data: vendor });
  });
})

/* add offers*/
app.put('/vendors/offers/:vendor_id',function(req,res){
  Vendor.findById(req.params.vendor_id, function(err, vendor) {
    if (err){
      res.send(err);
    }

    // Change a property here
    var offer={}
    offer.description=req.body.description;
    offer.points=req.body.points;
    vendor.offers.push(offer);
	  SendPushNotification();
	
    // Save the beer and check for errors
    vendor.save(function(err) {
      if (err){
        res.send(err);
      }

      res.json(vendor);
    });
  });
})


/*  UPDATE: vendor  */
app.put('/vendors/:vendor_id',function(req,res){
  Vendor.findById(req.params.vendor_id, function(err, vendor) {
    if (err){
      res.send(err);
    }

    // Change a property here
    vendor.name = req.body.name;
    vendor.address = req.body.address;
    vendor.image_url=req.body.image_url;
    vendor.location=req.body.location;

    // Save the beer and check for errors
    vendor.save(function(err) {
      if (err){
        res.send(err);
      }

      res.json(vendor);
    });
  });
})

/*  DELETE: vendor  */
app.delete('/vendors/:vendor_id',function(req,res){
  Vendor.findByIdAndRemove(req.params.vendor_id, function(err) {
    if (err){
      res.send(err);
    } else{
      res.json({message:req.params.vendor_id + " deleted."});
    };
  });
})


/*  GET: vendors  */
app.get('/vendors/:vendor_id',function(req,res){
  Vendor.findById(req.params.vendor_id, function(err, vendor) {
    if (err){
      res.send(err);
    }
    vendor.distance = '0.1';
    Points.findOne({'user_id':req.params.user_id, 
                    'vendor_id':eq.params.vendor_id}, function(err, points){
      vendor.points = points.points || 0;
      res.json(vendor);
    })
  });
})


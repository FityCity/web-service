var Vendor = require('../models/vendor');
app=require('../app')

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
  vendor.locaiton=req.body.location;

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


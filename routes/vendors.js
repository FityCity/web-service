var Vendor = require('../models/vendor');
app=require('../app')

/*  GET: vendors  */
app.get('/vendors',function(req,res){
  Vendor.find(function(err, activities) {
    if (err){
      res.send(err);
    }
    res.json(activities);
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
    res.json({ message: 'vendor added!', data: vendor });
  });
})



/*  GET: vendor  */
app.put('/vendor/:vendor_id',function(req,res){
  Vendor.findById(req.params.vendor_id, function(err, vendor) {
    if (err)
      res.send(err);

    // Change a property here
    vendor.name = req.body.name;
    vendor.address = req.body.address;
    vendor.image_url=req.body.image_url;
    vendor.locaiton=req.body.location;
    // Save the beer and check for errors
    vendor.save(function(err) {
      if (err)
        res.send(err);

      res.json(vendor);
    });
  });
})

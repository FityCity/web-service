var express = require('express');
var router = express.Router();
var Vendor = require('../models/vendor');

var vendorsRoute = router.route('/');
var vendorRoute = router.route('/vendor/:vendor_id');

/*  GET: vendors  */
vendorsRoute.get(function(req, res) {

  Vendor.find(function(err, vendors) {
    if (err){
      res.send(err);
    }
    res.json(vendors);
  });
});


 /*  POST: vendors  */
vendorsRoute.post(function(req, res) {

  // Create a new instance of the vendor model
  var vendor = new Vendor();

  // Set the vendor properties that came from the POST data
  vendor.name = req.body.name;
  vendor.deviceId = req.body.deviceId;

  // Save the vendor and check for errors
  vendor.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'vendor added!', data: vendor });
  });
});


/*  GET: vendor  */
vendorRoute.get(function(req, res) {
  // Use the Beer model to find a specific beer
  Vendor.findById(req.params.vendor_id, function(err, vendor) {
    if (err)
      res.send(err);

    res.json(vendor);
  });
});


// Create endpoint /api/beers/:beer_id for PUT
vendorRoute.put(function(req, res) {
  // Use the Beer model to find a specific beer
  Vendor.findById(req.params.vendor_id, function(err, vendor) {
    if (err)
      res.send(err);

    // Change a property here

    // Save the beer and check for errors
    vendor.save(function(err) {
      if (err)
        res.send(err);

      res.json(vendor);
    });
  });
});


module.exports = router;

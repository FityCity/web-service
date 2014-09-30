var express = require('express');
var router = express.Router();
var Offer = require('../models/offer');

var offersRoute = router.route('/');


/*  GET: offers  */
offersRoute.get(function(req, res) {

  Offer.find(function(err, offers) {
    if (err){
      res.send(err);
    }
    res.json(offers);
  });
});


 /*  POST: offers  */
offersRoute.post(function(req, res) {

  // Create a new instance of the offer model
  var offer = new Offer();

  // Set the offer properties that came from the POST data
  offer.name = req.body.name;
  offer.points = req.body.points;
  offer.description = req.body.description;
  offer.vendor_id = req.body.vendor_id;

  // Save the offer and check for errors
  offer.save(function(err) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'offer added!', data: offer });
  });
});


module.exports = router;

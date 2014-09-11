var express = require('express');
var router = express.Router();
var pg = require('pg');
var request = require('request');

router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
  });
})

/* Test GCM */
router.get('/gcm', function(req, res){
   request.post({ 
	  url: 'https://android.googleapis.com/gcm/send', 
	  headers:{
		 'Authorization':'key='+process.env.GCM_SERVER_KEY,
	  },
	  json:{
		 "registration_ids" : [process.env.GCM_ERIC_PHONE_KEY],
		 "data":{
			"message":"GCM Works!!! - Eric"
		 }
	  }}, function (error, response, body) {
			if(response.statusCode == 201){
			  res.render('gcm', {callback: JSON.stringify(body)}); } else {
			  res.render('gcm', {callback: JSON.stringify(body)});
	        }
	  });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var pg = require('pg');

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
   res.render('gcm', {callback: 'callback goes here'});
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

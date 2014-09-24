var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res) {
  res.send('test');
});

module.exports = router;

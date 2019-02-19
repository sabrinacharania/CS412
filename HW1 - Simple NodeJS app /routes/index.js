var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/get-it', function(req, res, next) {
  res.render('get-it', { title: 'Let\'s GET it' , string: 'ur a cool dude' });
});
router.post('/post-it', function(req, res, next) {
  const city= req.body.city;
  res.render('post-it', { title: 'Use a POST-it', city: city.toString() });
});
module.exports = router;

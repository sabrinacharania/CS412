var express = require('express');
var router = express.Router();
var request = require('request');

var CAT_API_URL   = "https://api.thecatapi.com/";
var CAT_API_KEY   = "d7fd551b-1c8e-4639-bbeb-554e10af8617";

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = { method: 'GET',
    url: 'https://api.thecatapi.com/v1/images/search',
    qs: { format: 'json' },
    headers:
        { 'Postman-Token': 'e520c9f3-5fe1-44f3-97c7-37ffce71d2fb',
          'Content-Type': 'application/json',
          'cache-control': 'no-cache' } };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log("body:", body);

     var results = JSON.parse(body);
    console.log("Results parsed:", results);

    res.render('index', { title: 'Cat Photo Generator', data: results[0]})
  });
});
module.exports = router;

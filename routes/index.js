var express = require('express');
var router = express.Router();
var response = require('../responses/index.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json(response);
});

module.exports = router;

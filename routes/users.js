var express = require('express');
var router = express.Router();
var posters=require('../constants/posters');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('event',{
    posters:posters
  })
});

module.exports = router;

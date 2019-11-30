var express = require('express');
var router = express.Router();
var Track = require('../models/Track');

router.get('/', function(req, res, next){
  Track.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/submit', function(req, res, next){
  Track.submit(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

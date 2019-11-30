var express = require('express');
var router = express.Router();
var Overview = require('../models/Overview');

router.get('/', function(req, res, next){
  Overview.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

var express = require('express');
var router = express.Router();
var Obligations = require('../models/Obligations');

router.get('/', function(req, res, next){
  Obligations.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/new', function(req, res, next){
  Obligations.new(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/delete', function(req, res, next){
  Obligations.delete(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/value', function(req, res, next){
  Obligations.updateValue(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/name', function(req, res, next){
  Obligations.updateName(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

var express = require('express');
var router = express.Router();
var Debts = require('../models/Debts');

router.get('/', function(req, res, next){
  Debts.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/new', function(req, res, next){
  Debts.new(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/delete', function(req, res, next){
  Debts.delete(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/value', function(req, res, next){
  Debts.updateValue(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/name', function(req, res, next){
  Debts.updateName(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

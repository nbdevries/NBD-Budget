var express = require('express');
var router = express.Router();
var DebtObligations = require('../models/DebtObligations');

router.get('/', function(req, res, next){
  DebtObligations.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/new', function(req, res, next){
  DebtObligations.new(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/delete', function(req, res, next){
  DebtObligations.delete(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/value', function(req, res, next){
  DebtObligations.updateValue(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/name', function(req, res, next){
  DebtObligations.updateName(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

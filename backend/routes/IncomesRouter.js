var express = require('express');
var router = express.Router();
var Incomes = require('../models/Incomes');

router.get('/', function(req, res, next){
  Incomes.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/new', function(req, res, next){
  Incomes.new(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/delete', function(req, res, next){
  Incomes.delete(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/value', function(req, res, next){
  Incomes.updateValue(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/name', function(req, res, next){
  Incomes.updateName(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

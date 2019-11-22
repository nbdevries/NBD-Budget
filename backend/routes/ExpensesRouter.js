var express = require('express');
var router = express.Router();
var Expenses = require('../models/Expenses');

router.get('/', function(req, res, next){
  Expenses.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/new', function(req, res, next){
  Expenses.new(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/delete', function(req, res, next){
  Expenses.delete(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/allowance', function(req, res, next){
  Expenses.updateValue(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

router.post('/update/name', function(req, res, next){
  Expenses.updateName(req.body, function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

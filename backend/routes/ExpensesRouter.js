var express = require('express');
var router = express.Router();
var Expenses = require('../models/Expenses');

router.get('/', function(req, res, next){
  Expenses.get(function(err,result){
    if (err) { res.json(err); } else { res.json(result); }
  })
})

module.exports=router;

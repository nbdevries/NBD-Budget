var db = require('../dbconnection')
var async = require('async')

var Track = {

  get:function(callback) {
    async.series([
      function (callback) {
        db.query(`SELECT id, name FROM expenses`, function(err, result) {
          if (err) console.log(err);
          callback(err, { expenseCategories: result })
        })
      },
      function (callback) {
        db.query(`SELECT id, name FROM incomes`, function(err, result) {
          if (err) console.log(err);
          callback(err, { incomeCategories: result })
        })
      },
      function (callback) {
        db.query(`SELECT id, name FROM obligations`, function(err, result) {
          if (err) console.log(err);
          callback(err, { obligationCategories: result })
        })
      }
    ], (err, results) => {
      let result = Object.assign({}, ...results)
      callback(err, result)
    })
  },

  submit:function(obj, callback) {
    console.log(obj)
    callback()
  }

}

module.exports = Track

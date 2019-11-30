var db = require('../dbconnection')
var async = require('async')

var Overview = {

  get:function(callback) {
    async.series([
      function (callback) {
        db.query(`SELECT * FROM incomes`, function(err, result) {
          if (err) console.log(err);

          let incomeTotalValue = result.reduce((acc, curr) => {
            return acc += curr.monthly_profit
          }, 0)

          callback(err, { incomeTotal: incomeTotalValue })
        })
      },
      function (callback) {
        db.query(`SELECT * FROM expenses`, function(err, result) {
          if (err) console.log(err);

          let expensesTotalValue = result.reduce((acc, curr) => {
            return acc += curr.monthly_allowance
          }, 0)

          callback(err, { expenseTotal: expensesTotalValue })
        })
      },
      function (callback) {
        db.query(`SELECT * FROM debts`, function(err, result) {
          if (err) console.log(err);

          let debtsTotalValue = result.reduce((acc, curr) => {
            return acc += curr.total
          }, 0)

          callback(err, { debtTotal: debtsTotalValue })
        })
      }
    ], (err, results) => {
      let result = Object.assign({}, ...results)
      callback(err, result)
    })
  }

}

module.exports = Overview

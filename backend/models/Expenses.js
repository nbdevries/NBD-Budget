var db = require('../dbconnection')

var Expenses = {

  get:function(callback) {
    db.query(`SELECT * FROM expenses`, callback)
  }

}

module.exports = Expenses

var db = require('../dbconnection')

var Expenses = {

  get:function(callback) {
    db.query(`SELECT * FROM expenses`, function(err, result) {
      if (err) console.log(err);

      let dataToSend = result.map(x => {
        return { value: x.monthly_allowance, name: x.name, id: x.id }
      })
      callback(err, dataToSend)
    })
  },

  new:function(obj, callback) {
    let expenseFields = { ...obj, monthly_allowance: 0 }
    db.query(`INSERT INTO expenses SET ?`, [expenseFields], callback)
  },

  updateValue:function(obj, callback) {
    db.query(`UPDATE expenses SET ? WHERE id = ?`, [{ monthly_allowance: obj.value }, obj.id], callback)
  },

  updateName:function(obj, callback) {
    db.query(`UPDATE expenses SET ? WHERE id = ?`, [{ name: obj.name }, obj.id], callback)
  },

  delete:function(obj, callback) {
    db.query(`DELETE FROM expenses WHERE id = ?`, [obj.id], callback)
  }

}

module.exports = Expenses

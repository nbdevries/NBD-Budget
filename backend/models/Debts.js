var db = require('../dbconnection')

var Expenses = {

  get:function(callback) {
    db.query(`SELECT * FROM debts`, function(err, result) {
      if (err) console.log(err);

      let dataToSend = result.map(x => {
        return { value: x.total, name: x.name, id: x.id }
      })
      callback(err, dataToSend)
    })
  },

  new:function(obj, callback) {
    let expenseFields = { ...obj, total: 0 }
    db.query(`INSERT INTO debts SET ?`, [expenseFields], callback)
  },

  updateValue:function(obj, callback) {
    db.query(`UPDATE debts SET ? WHERE id = ?`, [{ total: obj.value }, obj.id], callback)
  },

  updateName:function(obj, callback) {
    db.query(`UPDATE debts SET ? WHERE id = ?`, [{ name: obj.name }, obj.id], callback)
  },

  delete:function(obj, callback) {
    db.query(`DELETE FROM debts WHERE id = ?`, [obj.id], callback)
  }

}

module.exports = Expenses

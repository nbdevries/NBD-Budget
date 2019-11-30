var db = require('../dbconnection')

var DebtObligations = {

  get:function(callback) {
    db.query(`SELECT * FROM debt_obligations`, function(err, result) {
      if (err) console.log(err);

      let dataToSend = result.map(x => {
        return { value: x.monthly_total, name: x.name, id: x.id }
      })
      callback(err, dataToSend)
    })
  },

  new:function(obj, callback) {
    let expenseFields = { ...obj, monthly_total: 0 }
    db.query(`INSERT INTO debt_obligations SET ?`, [expenseFields], callback)
  },

  updateValue:function(obj, callback) {
    db.query(`UPDATE debt_obligations SET ? WHERE id = ?`, [{ monthly_total: obj.value }, obj.id], callback)
  },

  updateName:function(obj, callback) {
    db.query(`UPDATE debt_obligations SET ? WHERE id = ?`, [{ name: obj.name }, obj.id], callback)
  },

  delete:function(obj, callback) {
    db.query(`DELETE FROM debt_obligations WHERE id = ?`, [obj.id], callback)
  }

}

module.exports = DebtObligations

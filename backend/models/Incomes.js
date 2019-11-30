var db = require('../dbconnection')

var Incomes = {

  get:function(callback) {
    db.query(`SELECT * FROM incomes`, function(err, result) {
      if (err) console.log(err);

      let dataToSend = result.map(x => {
        return { value: x.monthly_profit, name: x.name, id: x.id }
      })
      callback(err, dataToSend)
    })
  },

  new:function(obj, callback) {
    let expenseFields = { ...obj, monthly_profit: 0 }
    db.query(`INSERT INTO incomes SET ?`, [expenseFields], callback)
  },

  updateValue:function(obj, callback) {
    db.query(`UPDATE incomes SET ? WHERE id = ?`, [{ monthly_profit: obj.value }, obj.id], callback)
  },

  updateName:function(obj, callback) {
    db.query(`UPDATE incomes SET ? WHERE id = ?`, [{ name: obj.name }, obj.id], callback)
  },

  delete:function(obj, callback) {
    db.query(`DELETE FROM incomes WHERE id = ?`, [obj.id], callback)
  }

}

module.exports = Incomes

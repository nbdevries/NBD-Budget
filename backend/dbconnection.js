// API setup - connection to database
var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nbd_budget'
  })

module.exports = connection

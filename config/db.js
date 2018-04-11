// app.js
const mysql = require('mysql');

// First you need to create a connection to the db
const db = {
  pool: mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'btcrest',
  }),
};
module.exports = db;

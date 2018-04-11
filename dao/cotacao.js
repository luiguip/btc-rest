const db = require('../config/db');

const insert = (cotacao, callback) => {
  const coin = cotacao.coin;
  const value = cotacao.value;
  const date = cotacao.date;
  const exchange = cotacao.exchange;
  const sql = 'insert into cotacao (moeda, valor, data, exchange) values (?,?,?,?)';
  db.pool.getConnection((err, connection) => {
    connection.query(sql, [coin, value, date, exchange], (errQuery) => {
      if (errQuery) callback(errQuery);
      console.log('cotacao cadastrada!');
      connection.release();
      callback(null, date);
    });
  });
};

const select = (date, callback) => {
  const sql = 'select moeda, valor, data, exchange from cotacao where data = ?';
  db.pool.getConnection((err, connection) => {
    connection.query(sql, [date], (errQuery, results) => {
      if (errQuery) callback(errQuery);
      console.log('cotacao consultada!');
      connection.release();
      callback(null, results[0]);
    });
  });
};

module.exports = {
  insert, select,
}
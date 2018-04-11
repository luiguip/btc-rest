const db = require('../config/db');

const insert = (user, callback) => {
  const email = user.email;
  const password = user.password;
  const sql = 'insert into usuario (email, senha) values (?, ?)';

  db.pool.getConnection((err, connection) => {
    connection.query(sql, [email, password], (err, results) => {
      if (err) callback(err);
      console.log('Usuario cadastrado!');
      connection.release();
      callback();
    });
  });
};

const select = (user, callback) => {
  const email = user.email;
  const password = user.password;
  const sql = 'select id, senha from usuario where email = ?';

  db.pool.getConnection((err, connection) => {
    connection.query(sql, [email], (errQuery, results) => {
      if (errQuery) return callback(errQuery);
      console.log('Usuario consultado!');
      connection.release();
      callback(null, results[0]);
    });
  });
};

const authenticate = (user, callback) => {

  const id = user.id;
  const sql = 'select id, senha from usuario where id = ?';

  db.pool.getConnection((err, connection) => {
    connection.query(sql, [id], (errQuery, results) => {
      if (errQuery) return callback(errQuery);
      console.log('Usuario consultado!');
      connection.release();
      callback(null, results[0]);
    });
  });
}

module.exports = {
  insert, select, authenticate,
};

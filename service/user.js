const bcrypt = require('bcrypt');
const authentication = require('./authentication');

const userDb = require('../dao/usuario');

const register = (email, password, callback) => {
  const user = {};
  bcrypt.hash(password, 0, (err, encripted) => {
    if (err) callback(err);
    else {
      user.email = email;
      user.password = encripted;
      userDb.insert(user, callback);
    }
  });
};

const login = (email, password, callback) => {
  const user = {};
  user.email = email;
  user.password = password;
  userDb.select(user, (errDb, result) => {
    if (errDb) return callback(errDb);
    const userToken = {
      id: result.id,
      email,
      password: result.senha,
    };
    bcrypt.compare(user.password, userToken.password, (err, same) => {
      if (!same) return callback(err);
      const token = authentication.encrypt(`${userToken.id} ${userToken.password}`);
      callback(null, token);
    });
  });
};

const authenticate = (token, callback) => {
  authentication.decrypt(token, (dToken) => {
    const fields = dToken.split(' ');
    const user = {
      id: fields[0],
      password: fields[1],
    };
    userDb.authenticate(user, (err, result) => {
      if (err) return callback(err);
      const userToken = {
        id: result.id,
        password: result.senha,
      };
      if (user.password === userToken.password) {
        console.log('usuario autenticado!');
        callback();
      } else {
        callback(new Error('Usuario nao authenticado'));
      }
    });
  });
};

module.exports = {
  register, login, authenticate,
};

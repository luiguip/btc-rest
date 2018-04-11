const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const password = process.env.PASSWORD || 'teste';

const decrypt = (text, callback) => {
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  callback(dec);
};

const encrypt = (text, callback) => {
  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  if (callback) return callback(crypted);
  return crypted;
};

module.exports = {
  decrypt, encrypt,
};

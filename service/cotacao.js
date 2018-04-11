const cotacaoDb = require('../dao/cotacao');
const moment = require('moment');

const saveQuotePoloniex = (ticker, callback) => {
  const btcInfo = ticker.USDT_BTC;
  const cotacao = {
    coin: 'USDT_BTC',
    value: btcInfo.last,
    date: moment(Date.now()).format('YYYY-MM-DD HH:mm'),
    exchange: 'poloniex',
  };
  cotacaoDb.insert(cotacao, callback);
};

const select = (dateRaw, callback) => {
  const date = dateRaw;
  cotacaoDb.select(date, (err, result) => {
    if (err) callback(err);
    if (result === undefined) callback();
    else {
      const cotacao = {
        coin: result.moeda,
        value: result.valor,
        date: result.data,
        exchange: result.exchange,
      };
      callback(null, cotacao);
    }
  });
};

module.exports = {
  saveQuotePoloniex, select,
};

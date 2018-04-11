const Poloniex = require('poloniex-api-node');
const cron = require('cron');

const cotacaoService = require('../service/cotacao');

const poloniex = new Poloniex();

const job = new cron.CronJob('* * * * *', () => {
  poloniex.returnTicker((err, ticker) => {
    if (err) console.log(err);
    cotacaoService.saveQuotePoloniex(ticker, (errService, date) => {
      if (errService) console.log(errService);
      console.log(`cotacao salva! Horario: ${date}`);
    });
  });
});

module.exports = {
  job,
};

const express = require('express');
const service = require('../service/cotacao');
const success = require('../responses/success.json');
const error = require('../responses/error.json');
const userService = require('../service/user');

const router = express.Router();

router.post('/cotacao', (req, res) => {
  if (req.body.date) {
    service.select(req.body.date, (err, cotacao) => {
      if (err) res.status(500).json(error);
      res.status(200).json(cotacao);
    });
  } else {
    res.status(400).json(error);
  }
});

router.post('/ordem', (req, res) => {
  userService.authenticate(req.get('Authorization'), (err) => {
    if (err) return res.status(500).json(error);
    return res.status(200).json(success);
  });
});
module.exports = router;

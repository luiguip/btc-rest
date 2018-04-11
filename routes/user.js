const express = require('express');
const service = require('../service/user');
const success = require('../responses/success.json');
const error = require('../responses/error.json');

const router = express.Router();

router.post('/register', (req, res) => {
  if (req.body.email && req.body.password) {
    service.register(req.body.email, req.body.password, (err) => {
      if (err) res.status(500).json(error);
      res.status(200).json(success);
    });
  } else {
    res.status(400).json(error);
  }
});

router.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    service.login(req.body.email, req.body.password, (err, token) => {
      if (err) res.status(500).json(error);
      else {
        res.status(200).set('Authorization', token).json(success);
      }
    });
  } else {
    res.status(400).json(error);
  }
});

module.exports = router;

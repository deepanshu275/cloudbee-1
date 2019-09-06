var express = require('express')
var router = express.Router();
var { addAWSKey } = require('../Controllers/KeyManager');

router.post('/add', function(req, res) {
  addAWSKey(req, res);
});

module.exports =  router;

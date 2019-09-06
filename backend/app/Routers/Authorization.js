var express = require('express')
var router = express.Router();
var addAWSCredentials = require('../Controllers/FileWriter.js');

router.post('/aws', function(req, res) {
  addAWSCredentials(req.body.awsAccessKey, req.body.awsSecretKey, res);
})

module.exports =  router;

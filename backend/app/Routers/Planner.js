var express = require('express')
var router = express.Router();
var {addAWSInstance, resetAWSConfiguration, removeAWSInstance, getAWSInstances, rewriteInfrastructure} = require('../Controllers/Planner');

router.delete('/remove', function(req, res) {
  removeAWSInstance(req, res);
});

router.post('/add', function(req, res) {
  addAWSInstance(req, res);
});

router.post('/rewrite', function(req, res) {
  rewriteInfrastructure(req, res);
});

router.get('/reset', function(req, res) {
  resetAWSConfiguration(req ,res);
})

router.get('/show', function(req, res) {
  getAWSInstances(req ,res);
})

module.exports =  router;

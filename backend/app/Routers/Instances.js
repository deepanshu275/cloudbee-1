var express = require('express')
var router = express.Router();
var {launchInstances, getInstances, createInstances, destroyInstances, destroyInstance} = require('../Controllers/Instances');

router.delete('/destroy', function(req, res) {
  let target = req.body.target
  destroyInstance(target, res);
});

router.post('/launch', function(req, res) {
  launchInstances(res);
});

router.get('/list', function(req, res) {
  getInstances(res);
})

module.exports =  router;

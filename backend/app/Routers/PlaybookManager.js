var express = require('express')
var router = express.Router();
var {showYaml, addPlay, rewritePlaybook, runPlaybook} = require('../Controllers/AnsibleManager');

router.post('/add', function(req, res) {
  addPlay(req, res);
});

router.get('/show', function(req, res) {
  showYaml(req, res);
});

router.post('/rewrite', function(req, res) {
  rewritePlaybook(req, res);
});

router.post('/run', function(req ,res){
  runPlaybook(req, res);
})

module.exports =  router;

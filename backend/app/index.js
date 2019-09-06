var express = require('express');
var app = express();
var http = require('http');
var bodyParser   = require('body-parser');
var server = http.createServer(app);

// Socket IO
var {cli, connection, consoleSocket} = require('./Controllers/Console');

const io = require('socket.io')(server);
connection(io);

console.log("ConsoleSocket", global.consoleSocket);

// CORS

var cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  Connection: "Keep-Alive"
}

app.use(cors(corsOptions));


// ROUTERS
var authourization = require('./Routers/Authorization');
var instance = require('./Routers/Instances');
var keyManager = require('./Routers/KeyManager');

var setup = require('./Controllers/Setup.js');
var {showYaml} = require('./Controllers/AnsibleManager');
// var planner = require('./Controllers/Planner.js');

// app.get('/plan', function(request, response) {
//   planner(response);
// });


var planner = require('./Routers/Planner')
var playbookManager = require('./Routers/PlaybookManager');

app.get('/setup', function (request, response) {
  response.end("<!DOCTYPE HTML>Hello World!");
  console.log("APP request");
  setup();
});
app.get('/yaml', function (request, response) {
  showYaml();
});



app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/cli', function (request, response) {
  cli(request, response);
});

app.use('/playbook', playbookManager);
app.use('/infrastructure', planner);
app.use('/keys', keyManager);
app.use('/auth', authourization);
app.use('/instance', instance);

server.listen(3000);
console.log('Listening on http://localhost:3000');

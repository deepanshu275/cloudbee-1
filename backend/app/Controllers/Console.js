connection = (io) => {
  io.on('connection', (socket) => {
    console.log("Connection Established!!", socket);
    global.consoleSocket = socket;
  });
}

cli = (req, res) => {
  const commandLine = ( req.body.command).replace(/(\r\n|\n|\r)/gm, "");

  console.log(commandLine);

  const {spawn} = require('child_process');
  const command = spawn('/bin/sh', [ '-c', commandLine ])
  let output = ""

  // var i = setInterval(getCWD.bind(null, command.pid, console.log), 100);

  command.stdout.on('data', (data) => {
    output += data + "\n";
    if (global.consoleSocket != undefined) {
      global.consoleSocket.emit('console', {stdout: data.toString('utf8'), stderr: undefined});
    }
  })

  command.stderr.on('data', (data) => {
    if (global.consoleSocket != undefined) {
      global.consoleSocket.emit('console', {stdout: undefined, stderr: data.toString('utf8')});
    }
  })

  command.on('close', (code) => {
    res.send({
      output,
      code
    })
  })
}

module.exports = {cli, connection};

const shell = require('shelljs');
const {spawn} = require('child_process');


function consoleOutput(output) {
  if (global.consoleSocket != undefined) {
    global.consoleSocket.emit('console', output);
  }
}

function launchInstances(res) {

  let commandLine = 'cd Terraform-Setup && bash ./launch.sh'

  const command = spawn('/bin/bash', [ '-c',  commandLine])

  command.stdout.on('data', (data) => {
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
      code
    })
  })
}

function getInstances(res) {
  shell.exec('cd Terraform-Setup && TF_STATE=./ /usr/local/bin/terraform-inventory --list', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    consoleOutput({stdout, stderr});

    if (error !== 0) {
      console.log('exec error: ${error}', error);
    }

    res.send(stdout)
  });
}

function destroyInstances(res) {

  let commandLine = 'cd Terraform-Setup && terraform destroy <<< "yes"'

  const command = spawn('/bin/bash', [ '-c',  commandLine])

  command.stdout.on('data', (data) => {
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
      code
    })
  })
}

function destroyInstance(target, res) {

  let commandLine = 'cd Terraform-Setup && bash -c \"terraform destroy -target=aws_instance.' + target + ' <<< "yes"\"'

  const command = spawn('/bin/bash', [ '-c',  commandLine])

  command.stdout.on('data', (data) => {
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
      code
    })
  })
}

function createInstances() {

}

module.exports = {launchInstances, getInstances, createInstances, destroyInstances, destroyInstance};

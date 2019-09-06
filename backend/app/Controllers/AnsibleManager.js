const yaml = require('js-yaml');
const fs   = require('fs');
var {connection, consoleSocket} = require('./Console');

function consoleOutput(output) {
  if (global.consoleSocket != undefined) {
    global.consoleSocket.emit('console', output);
  }
}

function showYaml(req, res) {
  // Get document, or throw exception on error
  try {
    const doc = yaml.safeLoad(fs.readFileSync('./Terraform-Setup/playbook-test.yml', 'utf8'));
    res.send(doc)
  } catch (e) {
    console.log(e);
  }
}

// REQ: Hostnames, Taskslist

function addPlay(req, res) {
  let play = req.body.play;

  let playBookLoc = './Terraform-Setup/playbook-test.yml'
  // Get document, or throw exception on error
  try {
    const doc = yaml.safeLoad(fs.readFileSync(playBookLoc, 'utf8'));

    doc.push(play);

    file = yaml.safeDump(doc, {
      'styles': {
        '!!null': 'canonical' // dump null as ~
      },
      'sortKeys': true        // sort object keys
    })

    fs.writeFile(playBookLoc, file, function(err) {
      if (err) throw err;

      res.send(file);
    })

  } catch (e) {
    console.log(e);
  }

}

function rewritePlaybook(req, res) {
  let playbook = req.body.playbook;
  let playBookLoc = './Terraform-Setup/playbook-test.yml'

  const shelljs = require('shelljs');
  shelljs.exec('touch ' + playBookLoc, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    consoleOutput({stdout, stderr});

    // Get document, or throw exception on error
    try {
      file = yaml.safeDump(playbook, {
        'styles': {
          '!!null': 'canonical' // dump null as ~
        },
        'sortKeys': true        // sort object keys
      })

      fs.writeFile(playBookLoc, file, function(err) {
        if (err) throw err;
        consoleOutput({stdout: file, stderr: err});
        res.send(file);
      })

    } catch (e) {
      console.log(e);
    }


  });
}

function runPlaybook(req, res) {
  const shelljs = require('shelljs');
  const {spawn} = require('child_process');

  const command = spawn('/bin/sh', [ '-c', 'cd Terraform-Setup && TF_STATE=./ ansible-playbook --inventory-file=/usr/local/bin/terraform-inventory playbook-test.yml' ])
  command.stdout.on('data', (data) => {
    if (global.consoleSocket != undefined) {
      global.consoleSocket.emit('console', {stdout: JSON.stringify(data.toString('utf8')), stderr: undefined});
    }
  })

  command.stderr.on('data', (data) => {
    if (global.consoleSocket != undefined) {
      global.consoleSocket.emit('console', {stdout: undefined, stderr: JSON.stringify(data.toString('utf8'))});
    }
  })

  command.on('close', (code) => {
    res.send({
      code
    })
  })
}

module.exports = {showYaml, addPlay, rewritePlaybook, runPlaybook}

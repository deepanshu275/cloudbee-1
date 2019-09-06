const fs = require('fs')
let jsonData = {}

let instance_file_path = './Terraform-Setup/instance.tf.json'
const shelljs = require('shelljs');
let sampleAwsKeyPair = {
    myKeyName: {
      key_name: "mykey-3",
      public_key: "${file(\"mykey-3.pub\")}"
    }
}

function consoleOutput(output) {
  if (global.consoleSocket != undefined) {
    global.consoleSocket.emit('console', output);
  }
}


function addAWSKey(req, res) {
  fs.readFile(instance_file_path, 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data)
    let key = req.body.awsKey;

    for (resource of jsonData["resource"]) {
      // resource.aws_key_pair is the key_pair array

      if (resource.aws_key_pair != undefined) {
        for (param in resource.aws_key_pair) {
          if (key[param] != undefined) {
            res.send({
              "Error": "Key already exists. Please choose a different name"
            });
            return;
          }
        }
        resource.aws_key_pair.push(key)

        let keyName = key[Object.keys(key)[0]].key_name;

        fs.writeFile(instance_file_path, JSON.stringify(jsonData), function(err) {
            if(err) {
              return console.log("Error", err);
            }


            shelljs.exec('cd Terraform-Setup && bash ./keygen.sh -k ' + keyName, (error, stdout, stderr) => {
              console.log(stdout);
              console.log(stderr);
              consoleOutput({stdout, stderr});
              if (error !== null) {
                console.log('exec error: ', error);
              }
              res.send(
                jsonData
              );
            })
        });
      }
    }
  })
}

function resetAWSConfiguration(req, res) {

}

function removeAWSInstance(req, res) {
  fs.readFile(instance_file_path, 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data)

    for (resource of jsonData["resource"]) {
      if (resource.aws_instance != undefined) {
        aws_instances_array = resource.aws_instance
        let instance_to_remove = req.body.to_remove

        for (var i = 0; i < aws_instances_array.length; i++) {
          if (aws_instances_array[i][instance_to_remove] != undefined) {
            aws_instances_array.splice(i, 1);
          }
        }

        console.log("AWS Instances Array");

        console.log(aws_instances_array);

        fs.writeFile(instance_file_path, JSON.stringify(jsonData), function(err) {
            if(err) {
              console.log("Error");
            }
            res.send(
              jsonData
            );
        });
      }
    }
  })
}

module.exports = {addAWSKey};

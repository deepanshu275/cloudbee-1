const fs = require('fs')
let jsonData = {}

let instance_file_path = './Terraform-Setup/instance.tf.json'

let awsInstance = {
  my_new_web_server: {
    ami: "${lookup(var.AMIS, var.AWS_REGION)}",
    instance_type: "t2.micro",
    key_name: "${aws_key_pair.mykey.key_name}",
    tags: {
      Role: "web",
      Env: "dev"
    }
  }
}

function consoleOutput(output) {
  if (global.consoleSocket != undefined) {
    global.consoleSocket.emit('console', output);
  }
}

function rewriteInfrastructure(req, res) {
  let infrastructure = req.body.infrastructure;

  const shelljs = require('shelljs');
  shelljs.exec('touch ' + instance_file_path, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
    consoleOutput({stdout, stderr});

    // Get document, or throw exception on error
    try {
      let file = JSON.stringify(infrastructure)
      fs.writeFile(instance_file_path, file, function(err) {
        if (err) throw err;
        consoleOutput({stdout: file, stderr: err});
        res.send(file);
      })

    } catch (e) {
      console.log(e);
    }
  });
}


function addAWSInstance(req, res) {
  fs.readFile(instance_file_path, 'utf-8', (err, data) => {
    if (err) throw err

    backup = JSON.parse(data);

    jsonData = JSON.parse(data);

    let count = 0;
    // to be added
    let instances = req.body.awsInstance;

    for (resource of jsonData["resource"]) {
      if (resource.aws_instance != undefined) {
        let existing_instances = []

        for (x of resource.aws_instance) {
          existing_instances.push(Object.keys(x)[0]);
        }
        // traverse instances to be added
        for (instance of instances) {
          // check if Instance ID exists
          if (!existing_instances.includes(Object.keys(instance)[0])) {

            resource.aws_instance.push(instance);

            count += 1
          }
        }
      }
    }

    fs.writeFile(instance_file_path, JSON.stringify(jsonData), function(err) {
        if(err) {
          console.log("Error");
        }
        res.send(
          jsonData
        );
    });

    // for (resource of jsonData["resource"]) {
    //   if (resource.aws_instance != undefined) {
    //     for (_instance of resource.aws_instance) {
    //       console.log(_instance);
    //       if (Object.keys(_instance).includes(Object.keys(instance)[0])) {
    //         res.send({
    //           "Error": "Instance already exists. Please choose a different name"
    //         });
    //         return;
    //       }
    //     }
    //
    //     resource.aws_instance.push(instance);
    //
    //     fs.writeFile(instance_file_path, JSON.stringify(jsonData), function(err) {
    //         if(err) {
    //           console.log("Error");
    //         }
    //         res.send(
    //           jsonData
    //         );
    //     });
    //   }
    // }


  })
}

function getAWSInstances(req, res) {
  fs.readFile(instance_file_path, 'utf-8', (err, data) => {
    if (err) throw err

    jsonData = JSON.parse(data)

    let instance = req.body.awsInstance;

    for (resource of jsonData["resource"]) {
      if (resource.aws_instance != undefined) {
        res.send(resource.aws_instance);
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

module.exports = {addAWSInstance, resetAWSConfiguration, removeAWSInstance, getAWSInstances, rewriteInfrastructure};

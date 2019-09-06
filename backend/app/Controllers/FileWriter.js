const fs = require('fs');

function addAWSCredentials(awsAccessKey, awsSecretKey, res) {

  if (awsAccessKey == undefined || awsSecretKey == undefined) {
    res.send({
      "Status": "Error"
    });
  }
  awsAccessKey = 'AWS_ACCESS_KEY=' + "\"" + awsAccessKey + "\"" + '\n'
  awsSecretKey = 'AWS_SECRET_KEY=' + "\"" + awsSecretKey + "\""

  fs.truncate('./Terraform-Setup/terraform.tfvars', 0, function (err) {
    if (err) throw err;
    console.log('File is cleared successfully.');

    fs.appendFile('./Terraform-Setup/terraform.tfvars', awsAccessKey, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
      fs.appendFile('./Terraform-Setup/terraform.tfvars', awsSecretKey, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');

        res.send({
          "Status": "Success"
        });

      });
    });
  });


}

module.exports = addAWSCredentials;

const shell = require('shelljs')

function setup() {

  shell.exec('touch ./Terraform-Setup/terraform.tfvars', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log('exec error: ${error}');
    }
  });

  shell.exec('sudo sh ./Terraform-Setup/installer.sh', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log('exec error: ', error);
    }
  });

  shell.exec('if [ -f ./Terraform-Setup/defaultkey ]; then echo "Key Exists"; else sudo sh ./Terraform-Setup/keygen.sh; fi', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log('exec error: ', error);
    }
  });
}

module.exports = setup;

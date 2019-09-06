#!/usr/bin/env bash

sudo apt-get install unzip

echo 'installing terraform'
wget https://releases.hashicorp.com/terraform/0.12.6/terraform_0.12.6_linux_amd64.zip
unzip terraform_0.12.6_linux_amd64.zip
sudo mv terraform /usr/local/bin/
sudo rm terraform_0.12.6_linux_amd64.zip
terraform --version
echo 'installed terraform'

echo 'installing terraform-inventory'
wget https://github.com/adammck/terraform-inventory/releases/download/v0.9/terraform-inventory_0.9_linux_amd64.zip
unzip terraform-inventory_0.9_linux_amd64.zip
sudo mv terraform-inventory /usr/local/bin/
sudo rm terraform-inventory_0.9_linux_amd64.zip
terraform-inventory --version
echo 'installed terraform-inventory'

yes "Y" | sudo apt install ansible

echo 'removing hostkey checking'
sudo sh -c "echo '    StrictHostKeyChecking no' >> /etc/ssh/ssh_config"
echo 'successfully removed hostkey checking'

echo 'editing defaultkey'
sudo sed -i "11i\remote_user = ec2-user\nprivate_key_file = ~/cloudbee/backend/Terraform-Setup/defaultkey" /etc/ansible/ansible.cfg

# CloudBee

An end-to-end platform designed to create, change, and improve highly customisable, large scale infrastructures by easily uploading blue-prints on an Angular 8 web interface with a NodeJS, Terraform and Ansible backend.

# Install npm

# Dependencies installation

sudo npm install -g @angular/cli

# Edit IP Address on front end
sudo nano front-end/src/app/ip.ts

# Deploy backend
cd backend &&
npm install &&
node_modules/forever/bin/forever start app/index.js &&
cd ../

# Deploy front-end
cd front-end &&
npm install node_modules/forever/bin/forever start node_modules/@angular/cli/bin/ng serve --host=0.0.0.0 &&
cd ../

**IMPORTANT - FOR SECURITY REASONS LAUNCH THE FRONT END ON YOUR LOCAL MACHINE**

# Install Terrafrom, Ansible etc using this api:

GET http://YOUR-IP:3000/setup

# ENTER YOUR AWS IAM CREDENTIALS

POST http://YOUR-IP:3000/auth/aws

HEADER:
Content-Type: application/json

BODY:
{
	"awsAccessKey": "YOUR-ACCESS-KEY",
	"awsSecretKey": "YOUR-SECRET-KEY"
}

#Created By Shlok Kapoor 2019

#!/usr/bin/env bash

# yes "" | ssh-keygen -f ./Terraform-Setup/mykey-2
#
# sudo chmod 400 ./Terraform-Setup/mykey-2


IS_KEY_DEFAULT=1

while getopts k: option
do
case "${option}"
in
k) KEY_NAME=${OPTARG}; yes "" | ssh-keygen -f Terraform-Setup/$KEY_NAME -q -N ""; IS_KEY_DEFAULT=0;;
esac
done

if [ $IS_KEY_DEFAULT -eq 1 ]; then yes "" | ssh-keygen -f Terraform-Setup/defaultkey -q -N ""; fi

sudo chmod a+r Terraform-Setup/defaultkey

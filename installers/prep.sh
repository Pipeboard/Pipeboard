#!/bin/bash

sudo apt-get install npm
npm install
sudo apt-get install docker
sudo systemctl start docker
sudo service start docker
bash ./installers/moduler.sh
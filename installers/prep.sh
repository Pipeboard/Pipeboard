#!/bin/bash

function linux_prep() {
    echo "Setting up for linux...";
    # sudo apt-get install npm
    # npm install
    # sudo apt-get install docker
    # sudo systemctl start docker
    # sudo service start docker
    # bash ./installers/moduler.sh
}

function mac_prep() {
    echo "Setting up for mac...";
    # sudo brew install npm
    # npm install
    # sudo brew install docker
    # sudo launchctl start docker
    # bash ./installers/moduler.sh
}

uname="`uname`"

echo $uname;

if [ "$uname" = "Linux" ];
then
    linux_prep
elif [ "$uname" = "Darwin" ];
then
    mac_prep
elif [ "$uname" = "Cygwin" ];
then
    linux_prep
elif [ "$uname" = "Msys" ];
then
    win_prep
elif [ "$uname" = "Win32" ];
then
    win_prep
elif [ "$uname" = "Freebsd" ];
then
    linux_prep
else
    linux_prep
fi
#!/bin/bash

function linux_prep() {
    echo "linux";
    # sudo apt-get install npm
    # npm install
    # sudo apt-get install docker
    # sudo systemctl start docker
    # sudo service start docker
    # bash ./installers/moduler.sh
}

function mac_prep() {
    echo "mac";
    # sudo brew install npm
    # npm install
    # sudo brew install docker
    # sudo launchctl start docker
    # bash ./installers/moduler.sh
}

uname="`uname`"

echo $uname;

if [ "$uname" = "linux-gnu" ];
then
    linux_prep
elif [ "$uname" = "darwin" ];
then
    mac_prep
elif [ "$uname" = "cygwin" ];
then
    linux_prep
elif [ "$uname" = "msys" ];
then
    win_prep
elif [ "$uname" = "win32" ];
then
    win_prep
elif [ "$uname" = "freebsd" ];
then
    linux_prep
else
    linux_prep
fi
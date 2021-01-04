#!/bin/bash

function linux_prep() {
    echo "Setting up for linux...\n\n";
    apt-get update
    sudo apt-get install npm
    npm install
    sudo apt-get install docker
    sudo systemctl start docker
    sudo service start docker
    bash ./installers/moduler.sh
    echo "\n\nAll setup for linux, continuing to grab modules..."
}

function mac_prep() {
    echo "Setting up for mac...\n\n";
    brew install npm
    npm install
    brew install docker
    open --hide --background -a Docker
    bash ./installers/moduler.sh
    echo "\n\nAll setup for mac, continuing to grab modules..."
}

function win_prep() {
    echo "Setting up for windows/windows server...";
    brew install npm
    npm install
    brew install docker
    open --hide --background -a Docker
    bash ./installers/moduler.sh
    echo "\n\nAll setup for windows, continuing to grab modules..."
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
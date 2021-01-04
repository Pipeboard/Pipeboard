#!/bin/bash

function linux_prep() {
    printf "Setting up for linux...\n\n";
    apt-get update
    yum update
    sudo apt-get install npm
    sudo apt-get install nodejs
    sudo apt-get install docker
    sudo yum install npm
    sudo yum install nodejs
    sudo yum install docker
    npm install
    sudo systemctl start docker
    sudo service start docker
    printf "\n\nAll setup for linux, continuing to grab modules...\n\n"
    bash ./installers/moduler.sh
}

function apt_linux_prep() {
    printf "Setting up for linux...\n\n";
    apt-get update
    sudo apt-get install npm
    sudo apt-get install nodejs
    sudo apt-get install docker
    npm install
    sudo systemctl start docker
    sudo service start docker
    printf "\n\nAll setup for linux, continuing to grab modules...\n\n"
    bash ./installers/moduler.sh
}

function yum_linux_prep() {
    printf "Setting up for centOS...\n\n";
    yum update
    sudo yum install npm
    sudo yum install nodejs
    sudo yum install docker
    npm install
    sudo systemctl start docker
    sudo service start docker
    printf "\n\nAll setup for centOS, continuing to grab modules...\n\n"
    bash ./installers/moduler.sh
}

function mac_prep() {
    printf "Setting up for mac...\n\n";
    sudo chown -R $(whoami) $(brew --prefix)/*
    brew install npm
    brew install nodejs
    brew install docker
    npm install
    open --hide --background -a Docker
    printf "\n\nAll setup for mac, continuing to grab modules...\n\n"
    bash ./installers/moduler.sh
}

function win_prep() {
    echo "Setting up for windows/windows server...";
    ./installers/preqs/Win8.1AndW2K12R2-KB3191564-x64.msu /quiet /norestart
    $cmda1="Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
    "${cmda1[@]}"
    choco install npm
    choco install nodejs
    choco install docker
    npm install
    open --hide --background -a Docker
    printf "\n\nAll setup for windows, continuing to grab modules...\n\n"
    bash ./installers/moduler.sh
}

uname="`uname`"
# echo $uname;

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
    echo "Unusable system! Sorry. :("
elif [ "$uname" = "Win32" ];
then
    win_prep
elif [ "$uname" = "Freebsd" ];
then
    echo "Unusable system! Sorry. :("
else
    echo "(Couldn't determine system, running as linux...)"
    linux_prep
fi
import arg from 'arg';

const ncmd = require('node-cmd');
const fs = require('fs');

let pmc = "apt-get";
ncmd.run("apt-get --version &> /dev/null", function(err, data, stderr) {
    let err2 = JSON.parse(JSON.stringify(err));
    if(err2) {
        if(err2.code == 127) {
            pmc = "yum";
        }
    }

    console.log("Downloading and installing dependencies and preperations, this could take a second...");

    ncmd.runSync("sudo " + pmc + " update | sudo " + pmc + " install apt-transport-https ca-certificates curl gnupg-agent software-properties-common");
    ncmd.runSync("curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -");
    ncmd.runSync("sudo " + pmc + " update | sudo add-apt-repository deb https://download.docker.com/linux/ubuntu stable' | sudo " + pmc + " install docker-ce docker-ce-cli containerd.io | npm install | sudo systemctl start docker | sudo service docker start | pipeboard apps pull --first-time | npm install");
    ncmd.runSync("sudo systemctl enable docker | echo manual | sudo tee /etc/init/docker.override | sudo chkconfig docker on");

    console.log("All done! Enjoy your linux Pipeboard installation! :)");
});
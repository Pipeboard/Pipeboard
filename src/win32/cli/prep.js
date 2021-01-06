import arg from 'arg';

const ncmd = require('node-cmd');

console.log("Downloading and installing dependencies and preperations, this could take a second...");

ncmd.run("choco --version > /dev/nul", function(err, data, stderr) {
    let err2 = JSON.parse(JSON.stringify(err));
    if(err2) {
        if(err2.code == 127) {
            ncmd.runSync("sudo " + pmc + " update | sudo " + pmc + " install npm nodejs docker | npm install | sudo systemctl start docker | sudo service start docker | pipeboard apps pull --first-time | npm install");
        }
    }
});

ncmd.runSync("sudo choco install nodejs > /dev/nul | sudo choco install yarn > /dev/nul | sudo choco install npm > /dev/nul | sudo choco install docker-ce > /dev/nul | sudo npm install > /dev/nul");

console.log("All done! Enjoy your windows Pipeboard installation! :) (If you'd like to learn more, checkout docs/explainations/prep-script.html#desktop for information on what just happened.)");
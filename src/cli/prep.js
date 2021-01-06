import arg from 'arg';

const ncmd = require('node-cmd');

export function parse(args) {
    let assystem = null;
    let assystem1 = args[4];
    if(args[3] == "--as") {
        assystem = args[4];
    }
    let platform = "linux";

    if(assystem == null) {
        platform = process.platform;
    } else {
        platform = assystem.toLowerCase();
    }

    initialize_for(platform);
}

function initialize_for(platform) {
    if(platform == "aix") {
        setup_for_errormsg();
    } else if(platform == "darwin") {
        setup_for_mac();
    } else if(platform == "freebsd") {
        setup_for_linux();
    } else if(platform == "linux" || platform == "centos" || platform == "unknown") {
        setup_for_linux();
    } else if(platform == "openbsd") {
        setup_for_errormsg();
    } else if(platform == "sunos") {
        setup_for_errormsg();
    } else if(platform == "win32" || platform == "windows") {
        setup_for_windows();
    } else {
        console.log("Unknown operating system, preparing as linux...");
        setup_for_linux();
    }

}

function setup_for_errormsg() {
    console.log("Oh no! It looks like your os is currently not supported for Pipeboard, you can look at docs/home.html#compatibility for what systems are permitted! You can run as linux if you'd like, and you know you have linux commands, by using the argument '--as linux'.")
}

function setup_for_mac() {
    console.log("Downloading and installing dependencies and preperations, this could take a second...");

    ncmd.run("brew --version", function(err, data, stderr) {
        let err2 = JSON.parse(JSON.stringify(err));
        if(err2) {
            if(err2.code == 127) {
                ncmd.run("xcode-select --version &> /dev/null", function(err2, data2, stderr2) {
                    let err3 = JSON.parse(JSON.stringify(err2));
                    if(err3) {
                        if(err3.code == 127) {
                            ncmd.runSync("xcode-select --install &> /dev/null");
                        }
                    }
                });

                ncmd.runSync("sudo rm -r -f ~/.hb-temp/homebrew &> /dev/null | sudo rm -r -f ~/.hb-temp &> /dev/null");
                ncmd.runSync("sudo mkdir ~/.hb-temp && sudo cd ~/.hb-temp &> /dev/null | sudo mkdir ~/.hb-temp/homebrew &> /dev/null && sudo curl -L https://github.com/Homebrew/brew/tarball/master &> /dev/null | sudo tar xz --strip 1 -C ~/.hb-temp &> /dev/null");
            }
        }
        ncmd.runSync("HOMEBREW_NO_AUTO_UPDATE=1 | brew install npm nodejs docker &> /dev/null | npm install &> /dev/null | pipeboard apps pull --first-time &> /dev/null | npm install &> /dev/null");

        console.log("All done! Enjoy your mac Pipeboard installation! : (If you'd like to learn more, checkout docs/explainations/prep-script.html#desktop for information on what just happened.)");
    });
}

function setup_for_windows() {
    console.log("Downloading and installing dependencies and preperations, this could take a second...");

    ncmd.run("choco --version > /dev/nul", function(err, data, stderr) {
        let err2 = JSON.parse(JSON.stringify(err));
        if(err2) {
            if(err2.code == 127) {
                ncmd.runSync("sudo " + pmc + " update | sudo " + pmc + " install npm nodejs docker | npm install | sudo systemctl start docker | sudo service start docker | pipeboard apps pull --first-time | npm install");
            }
        }
    });

    ncmd.runSync("sudo choco install nodejs > /dev/nul | sudo choco install yarn > /dev/nul | sudo choco install npm > /dev/nul | sudo choco install docker > /dev/nul | sudo npm install > /dev/nul");

    console.log("All done! Enjoy your windows Pipeboard installation! :) (If you'd like to learn more, checkout docs/explainations/prep-script.html#desktop for information on what just happened.)");
}

function setup_for_linux() {
    let pmc = "apt-get";
    ncmd.run("apt-get --version &> /dev/null", function(err, data, stderr) {
        let err2 = JSON.parse(JSON.stringify(err));
        if(err2) {
            if(err2.code == 127) {
                pmc = "yum";
            }
        }

        console.log("Downloading and installing dependencies and preperations, this could take a second...");

        ncmd.runSync("sudo " + pmc + "update | sudo " + pmc + " update | sudo " + pmc + " install apt-transport-https ca-certificates curl gnupg-agent software-properties-common | curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - | sudo add-apt-repository 'deb [arch=amd64] https://download.docker.com/linux/ubuntu$(lsb_release -cs) stable' | sudo " + pmc + " install docker-ce docker-ce-cli containerd.io | npm install | sudo systemctl start docker | sudo service docker start | pipeboard apps pull --first-time | npm install")

        console.log("All done! Enjoy your linux Pipeboard installation! :)");
    });
}
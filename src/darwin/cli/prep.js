import arg from 'arg';

const ncmd = require('node-cmd');

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
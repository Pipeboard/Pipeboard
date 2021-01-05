import arg from 'arg';

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const xhttp = new XMLHttpRequest();
const http = require("http");
const fs = require('fs');
const path = require('path');

// get "https://api.github.com/repos/Pipeboard/Pipeboard/releases/latest";
// get tarball url;
// clip the "/v" at the end to get the number;
// check VERSION file for number & compare to ^;
// if Release version is higher then VERSION file version {
//     download to ./.temp as ./.temp/example.tar.gz;
//     unzip to ./.temp/folder
//     copy all items from ./.temp/folder to ./ and leave files that haven't been in update_exclude_list
// }

function checkifbigger(i1x, i2x) {
    let bigger = i1x;

    let i1 = i1x.replace("v", "").split(".");
    let i2 = i2x.replace("v", "").split(".");

    if(i1.length < 2 || i2.length < 2) {
        console.log("Error: Version numbers are incorrectly formatted.");
        return;
    }

    let i1t1 = parseInt(i1[0]);
    let i1t2 = parseInt(i1[1]);
    let i1t3 = parseInt(i1[2]);

    let i2t1 = parseInt(i2[0]);
    let i2t2 = parseInt(i2[1]);
    let i2t3 = parseInt(i2[2]);

    if(i1t1 > i2t1) {
        bigger = i1x;
        return bigger;
    } else if(i2t1 > i1t1) {
        bigger = i2x;
        return bigger;
    } else if(i1t1 == i2t1) {
        bigger = "none";
    } else {
        console.log("Something went wrong...");
        return;
    }

    if(bigger == "none") {
        if(i1t2 > i2t2) {
            bigger = i1x;
            return bigger;
        } else if(i2t2 > i1t2) {
            bigger = i2x;
            return bigger;
        } else if(i1t2 == i2t2) {
            bigger = "none";
        } else {
            console.log("Something went wrong...");
            return;
        }

        if(bigger == "none") {
            if(i1t3 > i2t3) {
                bigger = i1x;
                return bigger;
            } else if(i2t3 > i1t3) {
                bigger = i2x;
                return bigger;
            } else if(i1t3 == i2t3) {
                bigger = "none";
                return i1x;
            } else {
                console.log("Something went wrong...");
                return;
            }
        }
    }
}

function update_to_next(nextversiondata) {
    let ntag = nextversiondata.tag_name;
    let ndlurl = nextversiondata.tarball_url;

    console.log("Updating to version " + ntag.replace("v", "") + " now...");

    let path2 = path.join(__dirname, '../../.donotusefortesting');
    try {
        if (fs.existsSync(path2)) {
            console.log("Error: This session is used for coding, please clone from GitHub, confirm theres no .donotusefortesting file, then run this command again.");
        }
        } catch(err) {
            var dir = path.join(__dirname, '../../update-temp');
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            const file = fs.createWriteStream(path.join(__dirname, '../../update-temp/tar.tar.gz'));
            let request = http.get(nextversiondata.tarball_url, function(response) {
                response.pipe(file);
            });


        }
}

console.log("Attempting to search for new Pipeboard stable releases...");

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let json = JSON.parse(this.responseText);
        let json1 = json[0];
        let downloadurl = json1.tarball_url;
        
        let ltag = "0.0.0";
        let xtag = json1.tag_name;
    
        let path1 = path.join(__dirname, '../../VERSION');
        fs.readFile(path1, {encoding: 'utf-8'}, function(err,data){
            if(err) {console.log(err);}

            let ltagx = data;

            ltag = ltagx;

            // console.log(ltag + xtag);

            let compareresults = checkifbigger(ltag, xtag);

            if(compareresults == ltag) {
                console.log("Your on the latest version currently available of Pipeboard, v" + ltag + ". If you think this is wrong, check your VERSION file and try again.");
                return;
            } else {
                let nextversiondata = null;
                let nextversiondatanum = 0;
                let currentversiondata = null;
                let whereinloop = -1;
                json.forEach(function(i) {
                    if(i.tag_name == "v" + ltag) {
                        currentversiondata = i;
                        nextversiondatanum = whereinloop;
                    }

                    if(whereinloop == nextversiondatanum) {
                        nextversiondata = i;
                    }
                    whereinloop = whereinloop + 1;
                });

                if(nextversiondata !== null) {
                    let ntag = nextversiondata.tag_name;
                    console.log("You are not running the latest version of Pipeboard (" + xtag + "), your on v" + ltag + ".\nWe will run this as many times as there are updates in order, due to restrictions!");

                    update_to_next(nextversiondata);
                } else {
                    console.log("Something went wrong...");
                }
            }
        });
    }
};
    
xhttp.open("GET", "https://api.github.com/repos/Pipeboard/Pipeboard/releases", true);
    
xhttp.send(); 
import arg from 'arg';

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const xhttp = new XMLHttpRequest();
const http = require("http");
const fs = require('fs');
const path = require('path');
const request = require('request');
const AdmZip = require('adm-zip');

function get_excluded_update_files() {
    let strm = fs.readFileSync(path.join(__dirname, "../conf/update_exclude_list"), {encoding: 'utf-8'});
    let lines = strm.split("\n");
    let lines2 = [];
    lines.forEach(function(line) {
        if(line.startsWith("//")) {
            return;
        } else if(line.startsWith("#")) {
            return;
        } else {
            if(line.includes("*")) {
                let dirformat = path.join(__dirname, "../../" + line.split("*")[0]);
                fs.readdirSync(dirformat).forEach(function(i) {
                    lines2.push(dirformat + i);
                })
            } else {
                lines2.push(path.join(__dirname, "../../" + line));
            }
        }
    })
    return lines2;
}

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

    console.log("Preparing for version " + ntag.replace("v", "") + " update...");

    let path2 = path.join(__dirname, '../../.donotusefortesting2');
    try {
        if (fs.existsSync(path2)) {
            console.log("Error: This session is used for coding, please clone from GitHub, confirm theres no .donotusefortesting file, then run this command again.");
        } else {
            console.log("Preparing to download the update package from the cloud...");

            var dir3 = path.join(__dirname, '../../update-temp');
            if(!fs.existsSync(dir3)) {
                fs.mkdirSync(dir3);
            }

            console.log("Attempting to grab the update package from the cloud...");

            let req = request.get({
                url: "http://github.com/Pipeboard/Pipeboard/archive/" + ntag + ".zip",
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            let rpipe = req.pipe(fs.createWriteStream(__dirname + "/../../update-temp/" + ntag + ".zip"));

            rpipe.on("open", function() {
                console.log("The package's host provided a valid archive, downloading...");
            });

            rpipe.on("close", function() {
                console.log("Sucessfully downloaded update package from the cloud!");
                console.log("Atempting to uncompress update package files...");
                
                var zipf1 = path.join(__dirname, '/../../update-temp/' + ntag + '.zip');
                var dir4 = path.join(__dirname, '/../../update-temp/' + ntag + '/');
                var dir5 = path.join(__dirname, '/../../update-temp/');
                var dir6 = path.join(__dirname, '/../../update-temp/dl/');

                console.log("Preparing temporary location for update package files...");

                if(!fs.existsSync(dir4)) {
                    fs.mkdirSync(dir4);
                } else {
                    fs.rmdirSync(dir4, {
                        recursive: true
                    });
                    fs.mkdirSync(dir4);
                }

                console.log("Finish preparing temporary location for update package files!");

                console.log("Preparing temporary location for web download response...");

                if(!fs.existsSync(dir6)) {
                    fs.mkdirSync(dir6);
                }

                console.log("Finished preparing temporary location for web download response!");

                console.log("Attempting to write web download to temporary location...");
                
                var zip = new AdmZip(zipf1);
                zip.extractAllTo(dir6, false);

                console.log("Sucessfully wrote web download to temporary location!")
                console.log("Attempting to extract the update package from the web download...");

                fs.renameSync(dir5 + "/dl/Pipeboard-" + ntag.replace("v", ""), dir5 + ntag);
                fs.rmdirSync(dir6);

                console.log("Sucessfully extracted the update package from the web download!");
                console.log("Sucessfully cleaned up temporary web download location!");

                console.log("Duplicating custom & untouchable files into " + ntag + "...");

                let exdf = get_excluded_update_files();
                exdf.forEach(function(pathi) {
                    let baseremoverbase = path.join(__dirname, "../../");
                    let filewithoutbase = pathi.split(baseremoverbase)[1];
                    let fpwitholdbase = pathi;
                    let fpwithnewbase = baseremoverbase + "update-temp/" + ntag + "/" + filewithoutbase;
                    fs.copyFileSync(fpwitholdbase, fpwithnewbase);
                });
            });
        }
    } catch(err) {
        console.log(err);
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
                        nextversiondatanum = whereinloop + 2;
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
const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");
const btoa = require("btoa");
const phpparse = require("../libs/phpparse/index.js");
const hlbrwsr = require('zombie');
const Path = require("path");

function examplecallback(err, sid) {
    if(err.exitCode !== 0) { 
        console.log(err);
    }

    let data = {
        "sid": sid,
        "out": err.err
    }
    let datapost = btoa(JSON.stringify(data));
    hlbrwsr.visit("http://localhost:81/emit?data=" + encodeURI(datapost), function(err, data) {
        if(err) console.log(err);
    });
}


exports.run = function(namespacestring) {
    let namespace = namespacestring.split(".");
    let sid = null;

    if(namespacestring.includes("?")) {
        sid = namespacestring.split("?")[1];
        namespace = namespacestring.split("?")[0].split(".");
    }

    if(namespace[0] == "hello" & namespace[1] == "world") {
        console.log(`"hello.world" test call was sucessfully.`);
    }
    
    if(namespace[0] == "docker") {
        if(namespace[1] == "up") {
            if(namespace[2] == "all") compose.upAll().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
            if(namespace[2] == "one" && namespace.length == 4) compose.upOne(namespace[3]).then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "down") {
            if(namespace[2] == "all") compose.down().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "kill") {
            if(namespace[2] == "all") compose.kill().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "stop") {
            if(namespace[2] == "all") compose.stop().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
            if(namespace[2] == "one" && namespace.length == 4) compose.stopOne(namespace[3]).then(
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if((namespace[1] == "rm" | namespace[1] == "remove") && namespace.length == 3) {
            if(namespace[2] == "stopped") compose.rm().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "exec" && namespace.length == 4) {
            compose.exec(namespace[2], namespace[3]).then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "logs" && namespace.length == 3) {
            compose.logs(namespace[2]).then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "run" && namespace.length == 4) {
            compose.run(namespace[2], namespace[3]).then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "build") {
            if(namespace[2] == "all") compose.buildAll().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
            if(namespace[2] == "one" && namespace.length == 4) compose.buildOne(namespace[3]).then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "pull") {
            if(namespace[2] == "all") compose.pullAll().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
            if(namespace[2] == "one" && namespace.length == 4) compose.pullOne(namespace[3]).then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "restart") {
            if(namespace[2] == "all") compose.restartAll().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
            if(namespace[2] == "one" && namespace.length == 4) compose.restartOne(namespace[3]).then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "ps") {
            compose.ps().then(
                () => {
                    examplecallback({exitCode:0,err:null,out:null}, sid);
                },
                (err) => {
                    examplecallback(err, sid);
                }
            );
        }
        if(namespace[1] == "config") {
            if(namespace.length == 3) {
                if(namespace[2] == "services") {
                    compose.configServices().then(
                        (err) => {
                            examplecallback(err, sid);
                        }
                    );
                }
                if(namespace[2] == "volumes") {
                    compose.configVolumes().then(
                        (err) => {
                            examplecallback(err, sid);
                        }
                    );
                }
            } else {
                compose.config();
            }
        }
    }
}
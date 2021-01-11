const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");

exports.run = function(namespacestring, callback = function(res) {if(res.err) console.log(res.err); }) {
    let namespace = namespacestring.split("/");

    if(namespace[0] == "hello" & namespace[1] == "world") {
        console.log(`"hello/world" test call was sucessfully.`);
    }
    
    if(namespace[0] == "docker") {
        if(namespace[1] == "up") {
            if(namespace[2] == "all") compose.upAll();
            if(namespace[2] == "one" && namespace.length == 4) compose.upOne(namespace[3]);
        }
        if(namespace[1] == "down") {
            if(namespace[2] == "all") compose.down();
        }
        if(namespace[1] == "kill") {
            if(namespace[2] == "all") compose.kill();
        }
        if(namespace[1] == "stop") {
            if(namespace[2] == "all") compose.stop();
            if(namespace[2] == "one" && namespace.length == 4) compose.stopOne(namespace[3]);
        }
        if((namespace[1] == "rm" | namespace[1] == "remove") && namespace.length == 3) {
            if(namespace[2] == "stopped") compose.rm();
        }
        if(namespace[1] == "exec" && namespace.length == 4) {
            compose.exec(namespace[2], namespace[3]).then(
                () => {
                    callback(res);
                }
            );
        }
        if(namespace[1] == "logs" && namespace.length == 3) {
            compose.logs(namespace[2]);
        }
        if(namespace[1] == "run" && namespace.length == 4) {
            compose.run(namespace[2], namespace[3]).then(
                () => {
                    callback(res);
                }
            );
        }
        if(namespace[1] == "build") {
            if(namespace[2] == "all") compose.buildAll();
            if(namespace[2] == "one" && namespace.length == 4) compose.buildOne(namespace[3]);
        }
        if(namespace[1] == "pull") {
            if(namespace[2] == "all") compose.pullAll();
            if(namespace[2] == "one" && namespace.length == 4) compose.pullOne(namespace[3]);
        }
        if(namespace[1] == "restart") {
            if(namespace[2] == "all") compose.restartAll();
            if(namespace[2] == "one" && namespace.length == 4) compose.restartOne(namespace[3]);
        }
        if(namespace[1] == "ps") {
            compose.ps();
        }
        if(namespace[1] == "config") {
            if(namespace.length == 3) {
                if(namespace[2] == "services") {
                    compose.configServices();
                }
                if(namespace[2] == "volumes") {
                    compose.configVolumes();
                }
            } else {
                compose.config();
            }
        }
    }
}
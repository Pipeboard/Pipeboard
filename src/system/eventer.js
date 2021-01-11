const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");

exports.run = function(namespacestring) {
    let namespace = namespacestring.split("/");
    
    if(namespace[0] == "docker") {
        if(namespace[1] == "up") {
            if(namespace[2] == "all") compose.upAll();
            if(namespace[2] == "one") compose.upOne(namespace[3]);
        }
        if(namespace[1] == "down") {
            if(namespace[2] == "all") compose.downAll();
            if(namespace[2] == "one") compose.upOne(namespace[3]);
        }
    }
}
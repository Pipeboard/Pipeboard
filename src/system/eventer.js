const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");

exports.run = function(namespacestring) {
    let namespace = namespacestring.split("/");
    
    if(namespace[0] == "docker") {
        if(namespace[1] == "upAll") {
            compose.upAll();
        }
    }
}
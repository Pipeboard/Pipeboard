const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");
const eventer = require("./eventer.js");
const vrm = require('./vars.js');

modules.run = function() {
    require('./api.js');
    require('./web.js');

    process.stdin.resume();
}

modules.runClose = function(after) {
    require('./api.js');
    require('./web.js');
}
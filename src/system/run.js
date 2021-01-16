const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");
const eventer = require("./eventer.js");
const vrm = require('./vars.js');

exports.run = function() {
    require('./api.js');
    require('./web.js');

    process.stdin.resume();
}

exports.runClose = function(after) {
    require('./api.js');
    require('./web.js');

    setTimeout((function() {
        return process.exit(0);
    }), parseInt(after) * 1000);
}
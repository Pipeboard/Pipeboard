const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");
const eventer = require("./eventer.js");

require('./socket.js');
require('./api.js');

process.stdin.resume();
const compose = require("docker-compose");
const compose_nc = require("docker-compose-nocompose");
const path = require("path");
const eventer = require("./eventer.js");
const vrm = require('./vars.js');

require('./api.js');
require('./web.js');

process.stdin.resume();
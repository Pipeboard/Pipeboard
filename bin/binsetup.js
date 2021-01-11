let ncmd = require('node-cmd');

ncmd.runSync("source " + __dirname + "/pipeboard");
ncmd.runSync("source " + __dirname + "/pipeboard-releaser");
ncmd.runSync("source " + __dirname + "/pipeboard-tester");
require("../src/libs/preprep.js");
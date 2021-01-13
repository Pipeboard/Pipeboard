let path = require('path');

exports.cli = function(args1) {
    let args = args1.slice(2, args1.length);

    if(args[0] == "prep") {
        require(path.join(__dirname, 'prep.js'));
    } else if(args[0] == "run") {
        require(path.join(__dirname, '../../system/run.js'));
    } else if(args[0] == "update") {
        require(path.join(__dirname, 'update.js'));
    }
}
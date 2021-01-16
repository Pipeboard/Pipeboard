let path = require('path');

exports.cli = function(args1) {
    let args = args1.slice(2, args1.length);

    if(args[0] == "prep") {
        require(path.join(__dirname, "/" + process.platform + "/prep.js"));
    } else if(args[0] == "run") {
        if(args[1] == "--close-after") {
            require(path.join(__dirname, '../system/run.js')).runClose(parseInt(args[2]));
        } else {
            require(path.join(__dirname, '../system/run.js')).run();
        }
    } else if(args[0] == "update") {
        require(path.join(__dirname, 'update.js'));
    }
}
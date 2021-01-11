exports.parseFile = function(path,callback) {
    var exec = require('child_process').exec;
    var cmd = 'php ' + path;
    
    exec(cmd, function(error, stdout, stderr) {
        callback(stdout);
    });
}
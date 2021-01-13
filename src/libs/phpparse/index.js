const fs = require('fs');

exports.parseFile = function(path, exportstring, callback) {
    var exec = require('child_process').exec;

    let cont = fs.readFileSync(path, 'utf8');
    cont = cont.replace(/__EXSTRNG__/g, '"' + exportstring + '"');

    // console.log(cont);

    fs.writeFileSync(path + ".tmp.php", cont);
    var cmd = 'php ' + path + ".tmp.php";
    
    exec(cmd, function(error, stdout, stderr) {
        callback(stdout);
        fs.rmSync(path + ".tmp.php");
    });
}
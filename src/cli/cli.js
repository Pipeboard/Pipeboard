import arg from 'arg';

let path = require('path');

export function cli(args) {
    args = args.slice(2, args.length);

    if(args[0] == "prep") {
        require(path.join(__dirname, 'prep.js'));
    } else if(args[0] == "run") {
        require(path.join(__dirname, '../system/run.js'));
    } else if(args[0] == "update") {
        require(path.join(__dirname, 'update.js'));
    }
}
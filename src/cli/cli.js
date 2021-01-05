import arg from 'arg';

export function cli(args) {
    console.log("Pipeboard CLI test.");

    args = args.slice(2, args.length);

    console.log(args);

    if(args[0] == "prep") {
        require('./prep.js');
    } else if(args[0] == "run") {
        require('../system/main.js');
    } else if(args[0] == "update") {
        require('./update.js');
    }
}
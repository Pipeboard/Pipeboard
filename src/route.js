let platform = process.platform;
require(path.join(__dirname, platform + '/system/run.js')).cli(process.argv);
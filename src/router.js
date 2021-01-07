let platform = process.platform;
require(path.join(__dirname, platform + '/system/run.js')).cli(process.argv);

function fromoldpath(path) {
    require(path.join(__dirname, platform + path));
}
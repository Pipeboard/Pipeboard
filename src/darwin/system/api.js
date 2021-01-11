const express = require('express');
const php = require('php');
const path = require('path');
const ncmd = require('node-cmd');

const eventer = require('./eventer.js');
const execPHP = require(path.join(__dirname, '../../_external/phpparse/index.js'));

const app = express();
const server = require('http').createServer(app);
 
// app.set('views', path.join(__dirname, '../web/api'));
// app.set('view engine', 'php');
// app.engine('php', php.__express);
 
app.get('*', (req, res) => {
    res.set("Content-Type", 'text/html');
    let exportstring = 'export PIPEBOARD_EXPRESS_API_QUERY=' + "'" + JSON.stringify(req.query) + "'";
    console.log(exportstring);
    ncmd.runSync(exportstring);
    execPHP.parseFile(path.join(__dirname, '../web/api/api.php'), function(phpResult) {
		res.write(phpResult);
		res.end();
	});
});

server.listen(81);

const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log("Connect");

    socket.on("event", (arg) => {
        eventer.run(arg);
    });
});
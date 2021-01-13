const express = require('express');
const php = require('php');
const path = require('path');
const ncmd = require('node-cmd');
const btoa = require('btoa');
const atob = require('atob');

const eventer = require('./eventer.js');
const execPHP = require(path.join(__dirname, '../libs/phpparse/index.js'));

const app = express();
const server = require('http').createServer(app);
 
app.get('*', (req, res) => {
    if(req.url.startsWith("/emit")) {
        let resdataarchive = req.query.data;

        execPHP.parseFile(path.join(__dirname, '../web/api/broadcast.php'), resdataarchive, function(render) {
            res.write(render);
            res.end();
        });
    } else if(req.url.startsWith("/run")) {
        let resdataarchive = {
            "url": req.url,
            "params": req.query
        }

        let exportstring = JSON.stringify(resdataarchive);
        exportstring = btoa(exportstring);
    
        execPHP.parseFile(path.join(__dirname, '../web/api/runner.php'), exportstring, function(render) {
            res.write(render);
            res.end();
        });
    } else {
        let resdataarchive = {
            "url": req.url,
            "params": req.query
        }

        let exportstring = JSON.stringify(resdataarchive);
        exportstring = btoa(exportstring);

        execPHP.parseFile(path.join(__dirname, '../web/api/interface.php'), exportstring, function(render) {
            res.set("Content-Type", 'application/json');
            res.write(render);
            res.end();
        });
    }
});

server.listen(81);

const io = require('socket.io')(server);
io.on('connection', socket => {
    socket.on("event", (arg) => {
        let namespacestring = arg;
        let namespace = namespacestring.split(".");
        let sid = null;

        if(namespacestring.includes("?")) {
            sid = namespacestring.split("?")[1];
            namespace = namespacestring.split("?")[0].split(".");
        }

        console.log("Event '" + sid + "' now executing with namespace '" + namespace + "'.");
        eventer.run(arg);
    });
    socket.on("event_out", (arg) => {
        let data = JSON.parse(atob(arg));
        console.log("Event '" + data.sid + "' finished! Sending response.");
    })
});
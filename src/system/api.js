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
server.listen(81);
const io = require('socket.io')(server);

app.get("*", (req, res) => {
    if(req.url.startsWith("/emit")) {
        if(req.query.title == null || req.query.data == null) {
            res.end();
            return;
        }
        let datapost = btoa(JSON.stringify(req.query));

        execPHP.parseFile(path.join(__dirname, '../web/api/broadcast.php'), datapost, function(results) {
            res.send(results);
        });
    } else if(req.url.startsWith("/favicon.ico")) {
        res.sendFile(path.join(__dirname, '../web/api/favicon.png'));
    } else {
        let namespace = req.url;
        if(req.url.includes("?")) {
            namespace = req.url.split("?")[0];
        }

        function makeeventid() {
            return 'xxxx-yxxxxx-xyxxx-xxxxxy-xxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }).toUpperCase();
        }

        let sid = makeeventid();

        namespace = namespace.substring(1);
        namespace2 = namespace;
        namespace = namespace + "?" + sid;

        if(req.query.token !== null) {
            // TODO: Check token.
            
            console.log("Event '" + sid + "' with '" + namespace2 + "'.");
            require("./eventer.js").run(namespace);
        }

        res.end();
    }
});
 
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
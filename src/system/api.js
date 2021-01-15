const express = require('express');
const app = express();
const path = require('path');
const btoa = require('btoa');
const fs = require('fs');
const atob = require('atob');
const eventer = require('./eventer.js');
const execPHP = require(path.join(__dirname, '../libs/phpparse/index.js'));
const server = require('http').createServer(app);

function makeeventid() {
    return 'xxxx-yxxxxx-xyxxx-xxxxxy-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

app.get("/favicon.png", (req, res) => {
    res.setHeader('Content-Type', 'image/png');

    res.end(fs.readFileSync(path.join(__dirname, '../web/favicon.png')));
});

app.get("/favicon.ico", (req, res) => {
    res.setHeader('Content-Type', 'image/png');

    res.end(fs.readFileSync(path.join(__dirname, '../web/favicon.ico')));
});

app.get("/socket/emit", (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if(req.query.title == null || req.query.data == null) {
        res.end();
        return;
    }

    let datapost = btoa(JSON.stringify(req.query));

    execPHP.parseFile(path.join(__dirname, '../web/api/broadcast.php'), datapost, function(results) {
        res.send(results);
    });
});

app.get("/events/run/*", (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let namespace = decodeURI(req.url.substring(11).replace(/\+/g, " "));
    console.log(namespace);

    if(req.url.includes("?")) {
        namespace = namespace.split("?")[0];
    }

    let sid = makeeventid();

    namespace = namespace.substring(1);
    namespace2 = namespace;
    namespace = namespace + "?" + sid;
        
    console.log("Event '" + sid + "' with '" + namespace2 + "'.");
    require("./eventer.js").run(namespace);

    res.end();
});

app.get("/events/history", (req, res) => {
    res.setHeader('Content-Type', 'application/json');

        let read = fs.readFileSync(path.join(__dirname, "../web/api/eventlog.json"), "utf8");
        res.send(JSON.stringify({
            "results": JSON.parse(read),
            "code": 200,
            "error": false
        }, null, 2));

        res.end();
});

app.get("/events/get/*", (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let reqsid = req.url.substring(12);
    if(reqsid.includes("/")) {
        reqsid = reqsid.split("/")[0];
    }

    console.log(reqsid);
    let logpath = path.join(__dirname, "../web/api/eventlog.json");
    let read = fs.readFileSync(logpath, "utf8");
    let cont = JSON.parse(read);
    var found = 0;
    cont.forEach(function(contr) {
        if(contr.sid === reqsid) {
            found = contr;
        }
    });

    if(found == 0) {
        res.send(JSON.stringify({
            "results": false,
            "code": "204",
            "error": "EVENT_ID_NOT_FOUND"
        }, null, 2));
        res.end();
    } else {
        if(req.url.endsWith(reqsid)) {
            res.send(JSON.stringify({
                "results": found,
                "code": "200",
                "error": false
            }, null, 2));
            res.end();
        } else {
            let findr = req.url.split("" + reqsid + "/")[1];
            let reschose = found;

            if(findr.includes("/")) {
                let findlist = findr.split("/");
                findlist.forEach(function(findx) {
                    if(reschose !== undefined) {
                        if(reschose[findx] !== undefined) {
                            reschose = reschose[findx];
                        } else {
                            reschose = undefined;
                            return;
                        }
                    } else {
                        reschose = undefined;
                        return;
                    }
                });
            } else {
                reschose = found[findr];
            }

            if(reschose !== undefined) {
                res.send(JSON.stringify({
                    "results": reschose,
                    "code": "200",
                    "error": false
                }, null, 2))
            } else {
                res.send(JSON.stringify({
                    "results": false,
                    "code": "206",
                    "error": "SUB_OBJECT_NOT_FOUND"
                }, null, 2));
                res.end();
            }
            res.end();
        }
        res.end();
    }

    res.end();
});

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "results": false,
            "code": "404",
            "error": "ENDPOINT_NOT_FOUND"
        }, null, 2));
        res.end();
})

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

        console.log(sid);

        if(sid == null) {
            sid = makeeventid();
        }

        console.log("Event '" + sid + "' now executing with namespace '" + namespacestring + "'.");
        eventer.run(arg);
    });
    socket.on("event_out", (arg) => {
        let data = JSON.parse(atob(arg));
        console.log("Event '" + data.sid + "' finished! Sending response.");
    })
});
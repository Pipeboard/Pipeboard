const express = require('express');
const path = require('path');
const btoa = require('btoa');
const atob = require('atob')
const phpparse = require(path.join(__dirname, '../libs/phpparse/index.js'));
const vars = require('./vars.js')
const fs = require('fs');

const eventer = require('./eventer.js');
const execPHP = require(path.join(__dirname, '../libs/phpparse/index.js'));

const app = express();
const server = require('http').createServer(app);

app.get("/favicon.png", (req, res) => {
    res.setHeader('Content-Type', 'image/png');

    res.end(fs.readFileSync(path.join(__dirname, '../web/favicon.png')));
});

app.get("/favicon.ico", (req, res) => {
    res.setHeader('Content-Type', 'image/png');

    res.end(fs.readFileSync(path.join(__dirname, '../web/favicon.ico')));
});

app.get("/static/css/*", (req, res) => {
    let datapost = btoa(JSON.stringify({
        "url": req.url,
        "query": req.query,
        "envs": vars.list()
    }));

    let wanted = req.url.substring(12);
    if(wanted.includes("?")) {
        wanted = wanted.split("?")[0];
    }
    if(wanted.includes(".css")) {
        wanted = wanted.split(".css")[0];
    }

    if(!fs.existsSync(path.join(__dirname, '../web/panel/css/' + wanted + '.php'))) {
        res.setHeader('Content-Type', 'text/json');
        res.send(JSON.stringify({
            "code": "404",
            "error": "STYLESHEET_NOT_FOUND"
        }, null, 2));
        res.end();
    } else {
        phpparse.parseFile(path.join(__dirname, '../web/panel/css/' + wanted + '.php'), datapost, function(output) {
            res.setHeader('Content-Type', 'text/css');
            res.send(output);
            res.end();
        });
    }
});

app.get("/static/image/*", (req, res) => {
    let wanted = req.url.substring(12);
    if(wanted.includes("?")) {
        wanted = wanted.split("?")[0];
    }

    if(!fs.existsSync(path.join(__dirname, '../web/panel/css/' + wanted))) {
        res.setHeader('Content-Type', 'text/json');
        res.send(JSON.stringify({
            "code": "404",
            "error": "IMAGE_NOT_FOUND"
        }, null, 2));
        res.end();
    } else {
        res.setHeader('Content-Type', 'image/png');
        res.send(fs.readFileSync(path.join(__dirname, '../web/panel/css/' + wanted)));
        res.end();
    }
});

app.all("*", (req, res) => {
    let datapost = btoa(JSON.stringify({
        "url": req.url,
        "query": req.query,
        "envs": vars.list()
    }));
    phpparse.parseFile(path.join(__dirname, '../web/panel/index.php'), datapost, function(output) {
        res.send(output);
        res.end();
    });
});

app.use(function (req, res, next) {
    res.status(404).send("Oops!");
})

server.listen(80);
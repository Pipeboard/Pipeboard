const express = require('express');
const path = require('path');
const btoa = require('btoa');
const atob = require('atob')
const phpparse = require(path.join(__dirname, '../libs/phpparse/index.js'));
const vars = require('./vars.js')
const fs = require('fs');
const mimelu = require('mime-types')

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
    res.setHeader('Access-Control-Allow-Origin', '*');

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

    if(!fs.existsSync(path.join(__dirname, '../web/panel/assets/css/' + wanted + '.php'))) {
        res.status(404);
        res.setHeader('Content-Type', 'text/json');
        res.send(JSON.stringify({
            "code": "404",
            "error": "STYLESHEET_NOT_FOUND"
        }, null, 2));
        res.end();
    } else {
        phpparse.parseFile(path.join(__dirname, '../web/panel/assets/css/' + wanted + '.php'), datapost, function(output) {
            res.setHeader('Content-Type', 'text/css');
            res.send(output);
            res.end();
        });
    }
});

app.get("/static/image/*", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let wanted = req.url.substring(14);
    if(wanted.includes("?")) {
        wanted = wanted.split("?")[0];
    }

    if(!fs.existsSync(path.join(__dirname, '../web/panel/assets/images/' + wanted))) {
        res.status(404);
        res.setHeader('Content-Type', 'text/json');
        res.send(JSON.stringify({
            "code": "404",
            "error": "IMAGE_NOT_FOUND"
        }, null, 2));
        res.end();
    } else {
        res.setHeader('Content-Type', 'image/png');
        res.send(fs.readFileSync(path.join(__dirname, '../web/panel/assets/images/' + wanted)));
        res.end();
    }
});

app.get("/static/font/*", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let wanted = req.url.substring(13);
    if(wanted.includes("?")) {
        wanted = wanted.split("?")[0];
    }

    let filePath = path.join(__dirname, '../web/panel/assets/fonts/files/' + wanted);
    if(!fs.existsSync(filePath)) {
        res.status(404);
        res.setHeader('Content-Type', 'text/json');
        res.send(JSON.stringify({
            "code": "404",
            "error": "FONT_FILE_NOT_FOUND"
        }, null, 2));
        res.end();
    } else {
        let result = mimelu.lookup(wanted);
        res.setHeader('Content-Type', result)
        res.send(fs.readFileSync(filePath));
        res.end();
    }
});

app.get("/static/fonts/*", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    let wanted = req.url.substring(14);
    if(wanted.includes("?")) {
        wanted = wanted.split("?")[0];
    }

    if(!fs.existsSync(path.join(__dirname, '../web/panel/assets/fonts/' + wanted + ".css"))) {
        res.status(404);
        res.setHeader('Content-Type', 'text/json');
        res.send(JSON.stringify({
            "code": "404",
            "error": "FONT_STYLESHEET_NOT_FOUND"
        }, null, 2));
        res.end();
    } else {
        res.setHeader('Content-Type', 'text/css');
        res.send(fs.readFileSync(path.join(__dirname, '../web/panel/assets/fonts/' + wanted + ".css")));
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
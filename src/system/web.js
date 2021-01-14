const express = require('express');
const path = require('path');
const btoa = require('btoa');
const atob = require('atob')

const eventer = require('./eventer.js');
const execPHP = require(path.join(__dirname, '../libs/phpparse/index.js'));

const app = express();
const server = require('http').createServer(app);

app.get("/favicon.ico", (req, res) => {
    res.setHeader('Content-Type', 'image/png');

    res.sendFile(path.join(__dirname, '../web/panel/favicon.png'));
    res.end();
});

app.get("/", (req, res) => {
    res.send("test");
    res.end();
});

app.use(function (req, res, next) {
    res.status(404).send("Oops!");
})

server.listen(80);
const fs = require('fs');
const atob = require('atob');
const btoa = require('btoa');
const path = require('path');

let filePath = path.join(__dirname, "var.json");

let read = fs.readFileSync(filePath, "utf8");
var vars = JSON.parse(read);
console.log(vars);

exports.set = function(name, value) {
    vars[name] = value;
    fs.writeFileSync(filePath, JSON.stringify(vars, null, 2));
}

exports.get = function(name) {
    return vars[name];
}

exports.find = function(value) {
    let found = [];

    vars.forEach(function(k, v) {
        if(v === value) found.add(k);
    });

    return found;
}

exports.list = function() {
    return vars;
}
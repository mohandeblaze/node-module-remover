#!/usr/bin/env node

var path = require('path');
var moduleRemover = require(path.resolve(__dirname, '../src/index'));

var argsStripped = process.argv.splice(process.execArgv.length + 2);

var args = argsStripped[0];
console.log(args ? `Path -> ${args}` :
    `Path -> ${process.cwd()}${path.sep}node_modules`);
moduleRemover(args ? args : `${process.cwd()}${path.sep}node_modules`);

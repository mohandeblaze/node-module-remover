#!/usr/bin/env node

var path = require('path');
var moduleRemover = require('../src/index');

var argsStripped = process.argv.splice(process.execArgv.length + 2);

var args = argsStripped[0];

var isCurrentFolder = args ? args.toString() === '--current' : false;

var isBatchDelete = args ? args.toString() === '--batch' : false;

var isBoth = args ? args.toString() === '--all' : false;

const both = async() => {
    await moduleRemover(`${process.cwd()}${path.sep}node_modules`);
    await moduleRemover(`${process.cwd()}`);
}

if (isBoth) {
    both();
} else if (isBatchDelete) {
    require('../src/batch-delete')();
} else if (isCurrentFolder) {
    moduleRemover(`${process.cwd()}`);
} else {
    moduleRemover(args ? args : `${process.cwd()}${path.sep}node_modules`);
}

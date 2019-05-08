#!/usr/bin/env node

var path = require('path');
var moduleRemover = require('../src/index');

var argsStripped = process.argv.splice(process.execArgv.length + 2);

var args = argsStripped[0];

var isCurrentFolder = args ? args.toString() === '--current' : false;

var isBatchDelete = args ? args.toString() === '--batch' : false;

var isBoth = args ? args.toString() === '--all' : false;

const both = async () => {
  await moduleRemover(`${process.cwd()}${path.sep}node_modules`);
  await moduleRemover(`${process.cwd()}`);
};

console.log(
  '\x1b[32m%s\x1b[0m',
  `Querying files in batch of 15 to avoid disk throttling`
);


(async function() {
  if (isBoth) {
    await both();
  } else if (isBatchDelete) {
    await require('../src/batch-delete')();
  } else if (isCurrentFolder) {
    await moduleRemover(`${process.cwd()}`);
  } else {
    await moduleRemover(
      args ? args : `${process.cwd()}${path.sep}node_modules`
    );
  }
})();

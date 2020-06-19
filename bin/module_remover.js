#!/usr/bin/env node
// @ts-check
var path = require('path');
var moduleRemover = require('../src/index');
const fsExtra = require('fs-extra');
const readline = require('readline');
const Glob = require('glob').Glob;
const logUpdate = require('log-update');
const { rmdir, readdirSync, statSync } = require('fs');

var argsStripped = process.argv.splice(process.execArgv.length + 2);

var args = argsStripped[0];

var isCurrentFolder = args ? args.toString() === '--current' : false;

var isBatchDelete = args ? args.toString() === '--batch' : false;

var isBoth = args ? args.toString() === '--all' : false;

const both = async () => {
    removeAllFiles(process.cwd());
};
(async function () {
    if (isBoth) {
        await both();
    } else if (isBatchDelete) {
        console.log('\x1b[32m%s\x1b[0m', `Querying files in batch of 15 to avoid disk throttling`);
        await require('../src/batch-delete')();
    } else if (isCurrentFolder) {
        console.log('\x1b[32m%s\x1b[0m', `Querying files in batch of 15 to avoid disk throttling`);
        await moduleRemover(`${process.cwd()}`);
    } else {
        console.log('\x1b[32m%s\x1b[0m', `Querying files in batch of 15 to avoid disk throttling`);
        await moduleRemover(args ? args : `${process.cwd()}${path.sep}node_modules`);
    }
})().catch((x) => {
    // console.log('Unable to remove all the files, Please check if the files are locked or busy by other programs');
});

function removeAllFiles(folder) {
    let targetFolder = path.resolve(folder);

    let globInstance = new Glob(`${targetFolder}/**/*`, { nodir: true, strict: true }, function (err, files) {
        if (err) {
            //console.log(err);
        } else {
            try {
                logUpdate('Cleaning up folders');
                const dirs = (p) => readdirSync(p).filter((f) => statSync(path.join(p, f)).isDirectory());
                dirs(targetFolder).forEach((x) => {
                    fsExtra.remove(x).catch((x) => {
                        // console.log('Unable to remove all the files, Please check if the files are locked or busy by other programs');
                    });
                });
                fsExtra.emptyDir(targetFolder).catch((x) => {
                    // console.log('Unable to remove all the files, Please check if the files are locked or busy by other programs');
                });
            } catch (e) {}
        }
    });

    globInstance.on('match', function (match) {
        logUpdate(path.resolve(match).split(process.cwd())[1]);
        fsExtra.unlink(match).catch((x) => {
            // console.log('Unable to remove all the files, Please check if the files are locked or busy by other programs');
        });
    });

    globInstance.on('error', function (match) {});
}

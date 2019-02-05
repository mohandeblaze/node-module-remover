const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const promisefied = require('util').promisify;
const readline = require('readline');

function printOnSameLine(data) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(data);
}

const module_remover = async(folder) => {
    let targetFolder = path.resolve(folder);
    let exists = fsExtra.existsSync(targetFolder);
    if (exists) {
        let dir = await promisefied(fs.readdir)(targetFolder);
        console.log('Please wait, deleting found folders', dir.length);
        let len = dir.length;
        for (let i = 0; i < dir.length; i++) {
            const current = dir[i];
            let pathValue = path.resolve(targetFolder, current);
            printOnSameLine(`Deleting - ${--len} - ${pathValue.split(path.sep).pop()}`);
            await fsExtra.remove(pathValue);
        }
        console.log("");
    }
}

module.exports = module_remover;

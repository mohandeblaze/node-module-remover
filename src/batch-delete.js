const fs = require('fs-extra');
const path = require('path');
const module_remover = require('../src/index');

const targetFolder = process.cwd();
// console.log("Target folder is and generating batch file", targetFolder);

const generator = async() => {

    const exists = fs.existsSync(targetFolder);
    if (exists) {
        const folders = await fs.readdir(targetFolder);
        for (let index = 0; index < folders.length; index++) {
            const folder = folders[index];
            const resolvedPath = path.resolve(targetFolder, folder);
            const details = fs.lstatSync(path.resolve(targetFolder, folder));
            if (details.isDirectory()) {
                await module_remover(path.resolve(`${resolvedPath}/node_modules`));
                await module_remover(path.resolve(`${resolvedPath}`));
            }
        }
    }
};

module.exports = generator;

const del = require('del');
const fs = require('fs');
const path = require('path');
const globby = require('globby');
const fsExtra = require('fs-extra');
const cliProgress = require('cli-progress');

function module_remover(folder) {
    var targetFolder = path.resolve(__dirname, folder);
    const bar = new cliProgress.Bar({
        format: 'Deleting [{bar}] {percentage}% | {value}/{total}',
        barCompleteChar: '>',
        barIncompleteChar: '-'
    }, cliProgress.Presets.shades_classic);
    fs.exists(targetFolder, function (exists) {
        if (exists) {
            console.log('Computing files, Please wait');
            var node_modules = globby([path.resolve(`${targetFolder}/**/*`), path.resolve(`${targetFolder}/**/.*`)]);
            node_modules.then(function (values) {
                bar.start(values.length, i);
                for (var i = 0; i < values.length; i++) {
                    del.sync(values[i]);
                    bar.update(i);
                }
                fsExtra.emptyDirSync(targetFolder);
                setTimeout(function () {
                    bar.stop();
                }, 500);
            })
            node_modules.catch(function (err) {
                console.log(err);
            })
        } else {
            console.log(`Folder doesn't exists -> ${folder}`);
        }
    })
}
module.exports = module_remover;

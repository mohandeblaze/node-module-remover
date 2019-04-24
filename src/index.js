const path = require('path');
const fsExtra = require('fs-extra');
const readline = require('readline');
const Glob = require('glob').Glob;

function printOnSameLine(data) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  process.stdout.write(data);
}

let i;
let currentBatchFiles;
const module_remover = async folder => {
  i = 0;
  currentBatchFiles = [];
  let targetFolder = path.resolve(folder);

  let globInstance = new Glob(`${targetFolder}/**/*`, { nodir: true }, function(
    err,
    files
  ) {
    if (err) {
      console.log(err);
    } else {
      printOnSameLine(`${targetFolder} - All files are deleted`);
      console.log('');
      printOnSameLine(`Cleaning up folders`);
      fsExtra.removeSync(targetFolder);
    }
  });

  globInstance.on('match', function(match) {
    if (i == 30) {
      globInstance.pause();

      currentBatchFiles.forEach(async currentFile => {
        printOnSameLine(`Deleting - ${currentFile.split('node_modules')[1]}`);
        await fsExtra.remove(currentFile);
      });
      i = 0;
      currentBatchFiles = [];
      globInstance.resume();
      printOnSameLine(
        `Querying next batch of 30 files to avoid disk throttling`
      );
    } else {
      currentBatchFiles.push(match);
      i++;
    }
  });
};

module.exports = module_remover;

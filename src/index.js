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

  let globInstance = new Glob(`${targetFolder}/**/*`, { nodir: true }, function (
    err,
    files
  ) {
    if (err) {
      console.log(err);
    } else {
      printOnSameLine(`${targetFolder} - All files are deleted`);
      printOnSameLine(`Cleaning up empty folders`);
	  try {
		fsExtra.removeSync(targetFolder);
	  } catch(e) {
		  
	  }
    }
    console.log('');

  });

  globInstance.on('match', function (match) {
    if (i == 15) {
      globInstance.pause();

      currentBatchFiles.forEach(async currentFile => {
        printOnSameLine(
          `Deleting - ${
          currentFile.split('node_modules')[1]
            ? 'node_modules/' + currentFile.split('node_modules')[1].split('/')[1]
            : path.resolve(currentFile).split(process.cwd())[1]
          }`
        );
        try {
          await fsExtra.remove(currentFile);
        } catch (error) { }
      });
      i = 0;
      currentBatchFiles = [];
      globInstance.resume();
    } else {
      currentBatchFiles.push(match);
      i++;
    }
  });
};

module.exports = module_remover;

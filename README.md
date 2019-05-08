# Node Modules Remover

Used to remove the node_modules folder and other regular folders using Node.js.

NPM: `npm i -g node-modules-remover`

Yarn: `yarn global add node-modules-remover`

## Glob Querying

* All the files will be fetched using Glob and queried in a batch of 15 files to avoid disk throttling. 

## Usage

### CLI

* Open command prompt & navigate to the root of the project where node_modules exists.
* Type `$ nmr` and hit enter to remove node_modules only.
* Type `$ nmr --all` and hit enter to remove node_modules and all files current directory.
* Type `$ nmr --batch` and hit enter to go to **each folder** from current working directory and delete their node_modules and all files present in that directory.

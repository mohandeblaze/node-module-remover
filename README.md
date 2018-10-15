# Node Modules Remover

Used to remove the node_modules folder.

NPM: `npm i -g module_remover`

Yarn: `yarn global add module_remover`

## Usage

* Open command prompt & navigate to where the node_modules exists.
* Run `nmr` and hit enter to remove node_modules.
* Run `nmr <folder-path>` and hit enter to remove the folder.

> It will not delete the root folder, but it will delete all the sub and deep folders. For Example, `nmr E:\some-folder`, it will delete all the files and folders inside `some-folder` except `some-folder` itself.

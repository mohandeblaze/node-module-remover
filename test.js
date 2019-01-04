var module_loader = require('./src/index');
var path = require('path');
module_loader(`${process.cwd()}${path.sep}node_modules`);

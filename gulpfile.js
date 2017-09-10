'use strict';
require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
require('./gulp/tasks/scripts');
require('./gulp/tasks/modernizr');
require('./gulp/tasks/build');

// $ npm install -g npm-check-updates
// $ npm-check-updates -u
// $ rm -fr node_modules
// $ npm install
// Basically this installs npm-check-updates globally, runs it against your package.json and updates the dependency versions.
// Then you just delete the node modules folder and re-install.
// from: https://stackoverflow.com/questions/27024431/updating-gulp-plugins
// As a general rule, and as a last resort, we better clean the npm cache with
// $ npm cache clean





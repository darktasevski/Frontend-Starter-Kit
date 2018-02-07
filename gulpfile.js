// $ npm install -g npm-check-updates
// $ npm-check-updates -u // alias: ncu
// $ rm -rf node_modules
// $ npm install
// Basically this installs npm-check-updates globally, runs it against your package.json and updates the dependency versions.
// Then you just delete the node modules folder and re-install.
// from: https://stackoverflow.com/questions/27024431/updating-gulp-plugins
// As a general rule, and as a last resort, we better clean the npm cache with
// $ npm cache clean


const requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

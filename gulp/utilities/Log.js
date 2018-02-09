/**
 * Error, warning, info logger
 */
const gutil = require('gulp-util');
const notifier = require('node-notifier');

function Log(taskName, message) {
  this.error = function error() {
    notifier.notify({
      title: taskName,
      message
    });
    throw new gutil.PluginError({
      plugin: taskName,
      message: gutil.colors.red(message)
    });
  };
  this.info = function info() {
    gutil.log(taskName, gutil.colors.magenta(message));
  };
}

module.exports = Log;

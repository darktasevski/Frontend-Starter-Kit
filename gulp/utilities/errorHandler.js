const notify = require('gulp-notify');
// Error handling
module.exports = function(...args) {
  // const args = Array.prototype.slice.call(arguments);
  const argsArr = [...args];
  // Send error to notification center with gulp-notify.
  notify
    .onError({
      title: 'Compile Error',
      message: '<%= error %>'
    })
    .apply(this, argsArr);
  // Keep gulp from hanging on this task.
  this.emit('end');
};

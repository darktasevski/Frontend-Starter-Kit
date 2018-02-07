const gulp = require('gulp');
const webpack = require('webpack');
const notifier = require('node-notifier');

gulp.task('scripts', ['modernizr'], (callback) => {
  webpack(require('../../webpack.config.js'), (err, stats) => {
    if (stats.compilation.errors.length) {
      // Notifiers if errors
      notifier.notify({
        title: 'Webpack error',
        message: stats.compilation.errors[0].error.toString('utf8')
      });
    }
    console.log(stats.toString());
    callback();
  });
});

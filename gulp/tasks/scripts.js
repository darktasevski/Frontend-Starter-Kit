const gulp = require('gulp');
const webpack = require('webpack');
const notifier = require('node-notifier');
const Log = require('../utilities/Log.js');
const webpackConfig = require('../../webpack.config.js');

gulp.task('scripts', ['modernizr'], (callback) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      new Log('Webpack', err).error();
    }
    new Log(
      'Webpack',
      stats.toString({
        assets: true,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        timings: true,
        version: false
      })
    ).info();
    callback();
  });
});

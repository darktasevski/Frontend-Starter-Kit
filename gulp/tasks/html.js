const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const notify = require('gulp-notify');
const path = require('path');
const plumber = require('gulp-plumber');

gulp.task('html', () =>
  gulp
    .src('./app/html/index.html')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: './app/html/templates'
    }))
    .pipe(gulp.dest('./app/')));

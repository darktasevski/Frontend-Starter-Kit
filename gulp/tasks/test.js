const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', () =>
  gulp
    .src(['test/*.js'])
    .pipe(mocha({
      reporter: 'nyan'
      // compilers:
      // babel({
      //     presets: ['env']
      // })
    }))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    }));

// https://github.com/tiagorg/gulp-es6-webpack-example
gulp.task('test', ['babel'], () =>
  gulp
    .src('test/*.js')
    .pipe(mocha())
    .on('error', () => {
      gulp.emit('end');
    }));

gulp.task('watch-test', () => gulp.watch(['src/**', 'test/**'], ['test']));

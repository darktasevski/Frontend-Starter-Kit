const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/,
  lazy: true,
  scope: ['dependencies', 'devDependencies']
});

gulp.task('watch', () => {
  $.util.log('---------------------------------------');
  $.util.log('Night gathers, and now my watch begins.');
  $.util.log('---------------------------------------');

  browserSync.init({
    // Customize the Browsersync console logging prefix
    logPrefix: ' 💻 ',
    server: {
      baseDir: 'app',
      index: 'index.html'
    },
    port: 3000
  });

  $.watch(
    [
      './app/html/index.html',
      './app/html/templates/*.html',
      './app/index.html'
    ],
    () => {
      gulp.start('htmlRefresh');
    }
  );

  $.watch('./app/assets/styles/**/*.+(css|scss)', () => {
    gulp.start('cssInject');
  });

  $.watch('./app/assets/scripts/**/*.js', () => {
    gulp.start('scriptsRefresh');
  });
});

gulp.task('cssInject', ['styles'], () =>
  gulp.src('./app/temp/styles/main.css').pipe(browserSync.stream()));

gulp.task('scriptsRefresh', ['scripts'], () => {
  browserSync.reload();
});

gulp.task('htmlRefresh', ['html'], () => {
  browserSync.reload();
});

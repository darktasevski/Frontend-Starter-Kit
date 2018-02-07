const gulp = require('gulp');
const modernizr = require('gulp-modernizr');

gulp.task('modernizr', () =>
  gulp
    .src('./app/assets/**/*.{css,js}')
    .pipe(modernizr({
      cache: true,
      options: ['setClasses', 'html5shiv']
    }))
    .pipe(gulp.dest('./app/temp/scripts/')));

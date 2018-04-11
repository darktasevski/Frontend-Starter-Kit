const gulp = require('gulp');
const fontMagician = require('postcss-font-magician');
const onError = require('../utilities/errorHandler');
const postcssImageSet = require('postcss-image-set-polyfill');

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[-.]/,
  lazy: true,
  camelize: true,
  scope: ['dependencies', 'devDependencies']
});

//  Path variables
const paths = {
  cssSource: './app/assets/styles/main.scss',
  cssDest: './app/temp/styles'
};
/* eslint-disable global-require */
// Task
gulp.task('styles', () =>
  gulp
    .src(paths.cssSource)
    .pipe(
      $.plumber({
        errorHandler: onError
      })
    )
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(
      $.postcss([
        require('postcss-partial-import')({
          prefix: '_',
          extension: '.css'
        }),
        require('postcss-assets')({
          basePath: 'app',
          loadPaths: ['assets/images'],
          cachebuster: true
        }), // assets url handling -- https://github.com/borodean/postcss-assets
        require('postcss-normalize')({ browsers: 'last 2 versions' }),
        fontMagician({
          hosted: ['./app/assets/fonts']
        }), // https://github.com/jonathantneal/postcss-font-magician
        require('postcss-cssnext')(), // http://cssnext.io/features/
        require('postcss-reporter')()
      ])
    )
    .pipe($.sourcemaps.write('./'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest(paths.cssDest))
);

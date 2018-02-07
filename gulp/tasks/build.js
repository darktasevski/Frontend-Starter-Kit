const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');

// Lazy load plugins
const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/,
  lazy: true,
  camelize: true,
  scope: ['dependencies', 'devDependencies']
});

// Browsersync server for dist folder
gulp.task('previewDist', () => {
  browserSync.init({
    logPrefix: ' 💻 ',
    server: {
      baseDir: 'dist'
    },
    port: 3001
  });
});

// Fonts
gulp.task('fonts', ['deleteDist'], () =>
  gulp
    .src('./app/assets/fonts/*.{eot,woff,woff2,svg,ttf,otf}')
    .pipe($.plumber())
    .pipe($.plumber.stop())
    .pipe($.size({
      gzip: true,
      showFiles: true
    }))
    .pipe(gulp.dest('./dist/assets/fonts')));

// delete dist folder everytime before starting distributing files in it.
gulp.task('deleteDist', () => del('./dist'));

gulp.task('optimizeImages', ['deleteDist'], () =>
  gulp
    .src([
      './app/assets/images/**/*',
      '!./app/assets/images/icons',
      '!./app/assets/images/icons/**/*'
    ])
    .pipe($.plumber())
    .pipe($.imagemin({
      // compressing images
      optimizationLevel: 6,
      progressive: true, // this will optimize jpg images
      interlaced: true, // this will help optimizing gif images
      multipass: true, // this will help with svg files
      verbose: true,
      use: []
    }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('./dist/assets/images')));

gulp.task('copyGeneralFiles', ['deleteDist'], () => {
  const pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ];
  return gulp.src(pathsToCopy).pipe(gulp.dest('./dist'));
});

gulp.task('useminTrigger', ['deleteDist'], () => {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () =>
  gulp
    .src('./app/index.html')
    .pipe($.htmlmin({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe($.usemin({
      css: [
        function() {
          return $.rev();
        },
        function() {
          return $.cssnano({
            discardComments: {
              removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
          });
        }
      ],
      js: [
        function() {
          return $.rev();
        },
        function() {
          return $.babelMinify({
            mangle: {
              keepClassName: true
            }
          });
        }
      ]
    }))
    .pipe($.size({
      gzip: true,
      showFiles: true
    }))
    .pipe(gulp.dest('./dist')));

gulp.task(
  'build',
  [
    'deleteDist',
    'copyGeneralFiles',
    'optimizeImages',
    'useminTrigger',
    'fonts'
  ],
  () => {}
);

gulp.task('deleteDocs', () => del('./docs'));
// build task is required to run before gh-pages
gulp.task('gh-pages', () =>
  gulp.src('./dist/**/**/*').pipe(gulp.dest('./docs')));

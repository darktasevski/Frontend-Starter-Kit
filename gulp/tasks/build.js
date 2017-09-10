var gulp 		= require('gulp'),
	browserSync = require('browser-sync').create(),
	del 		= require('del');

var $ = require("gulp-load-plugins")({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/, 
		lazy: true,
		camelize: true,
		scope: ['dependencies', 'devDependencies']
});

gulp.task('previewDist', function () {

	browserSync.init({
		logPrefix: 'FSK',
		server: {
			baseDir: 'docs',
			index: "index.html"
		},
		port: 3001
	})

});

gulp.task('deleteDist', function () { // delete dist folder everytime before starting distributing files in it.
	return del('./docs')
});


gulp.task('optimizeImages', ['deleteDist'], function () {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe($.imagemin({ // compressing images 
			progressive: true, // this will optimize jpg images
			interlaced: true, // this will help optimizing gif images
			multipass: true // this will help with svg files

		}))
		.pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('copyGeneralFiles', ['deleteDist'], function () {
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**',
		'!./app/doc',
		'!./app/doc/**'
	]
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./docs'));
});

gulp.task('useminTrigger', ['deleteDist'], function () {
	gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function () {
	return gulp.src('./app/index.html')
		.pipe($.htmlmin({
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeRedundantAttributes: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			removeOptionalTags: true
		}))
		.pipe($.usemin({
			css: [function () {
				return $.rev()
			}, function () {
				return $.cssnano()
			}],
			js: [function () {
				return $.rev()
			}, function () {
				return $.babelMinify(({
					mangle: {
						keepClassName: true
					}
				}))
			}]
		}))
		.pipe(gulp.dest('./docs'));
});


gulp.task('build', ['deleteDist', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger'], function () {

})
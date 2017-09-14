const gulp 			= require('gulp'),
	  browserSync 	= require('browser-sync').create();

var $ = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/, 
	lazy: true,
	scope: ['dependencies', 'devDependencies']
});

gulp.task('watch', function(){

	browserSync.init({
    // Customize the Browsersync console logging prefix
    	logPrefix: 'FSK',
		server: {
			baseDir: 'app',
			index: "index.html"
		},
		port: 3000
	});

	$.watch('./app/index.html', function(){
		browserSync.reload();
	});

	$.watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});

	$.watch('./app/assets/scripts/**/*.js', function(){
		gulp.start('scriptsRefresh');
	});
});

gulp.task('cssInject', ['styles'], function(){
	return gulp.src('./app/temp/styles/main.css')
		.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function(){
	browserSync.reload();
})
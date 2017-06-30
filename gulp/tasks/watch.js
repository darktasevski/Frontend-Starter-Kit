const gulp 		= require('gulp'),
watch 		 	= require('gulp-watch'),
browserSync 	= require('browser-sync').create(),
gutil			= require('gulp-util');

gulp.task('watch', function(){

	browserSync.init({

		server: {
			baseDir: 'app',
			index: "index.html"
		}
	});

	watch('./app/index.html', function(){
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});

	watch('./app/assets/scripts/**/*.js', function(){
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
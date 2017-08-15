var gulp 		= require('gulp'),
browserSync	 	= require('browser-sync').create(),
imagemin 		= require('gulp-imagemin'),
cssNano	 		= require('gulp-cssnano'),
usemin 	 		= require('gulp-usemin'),
minify 			= require("gulp-babel-minify"),
htmlmin 		= require('gulp-htmlmin'),
del 	 		= require('del'),
rev		 		= require('gulp-rev');

gulp.task('previewDist', function(){

	browserSync.init({
		server: {
			baseDir: 'docs',
			index: "index.html"
		}
	})

});

gulp.task('deleteDist', function(){ // delete dist folder everytime before starting distributing files in it.
	return del('./docs')
});


gulp.task('optimizeImages',['deleteDist'], function(){
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({ // compressing images 
			progressive: true,  // this will optimize jpg images
			interlaced: true,	// this will help optimizing gif images
			multipass: true 	// this will help with svg files

		}))
		.pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('copyGeneralFiles', ['deleteDist'], function(){
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

gulp.task('useminTrigger', ['deleteDist'], function(){
	gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function(){
	return gulp.src('./app/index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(usemin({
			css: [ function(){return rev()}, function(){ return cssNano()}],
			js: [ function(){return rev()}, function(){ return minify(({
				mangle: {
				  keepClassName: true
				}
			  }))}]
		}))
		.pipe(gulp.dest('./docs'));
});


gulp.task('build', ['deleteDist', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger'], function(){

})
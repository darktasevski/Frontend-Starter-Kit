var gulp 		 	= require('gulp'),	
	lost			= require('lost'),
 	gutil 		 	= require('gulp-util'),
	postcss 	 	= require('gulp-postcss'),
	cssnext		 	= require('postcss-cssnext'),
	rucksack		= require('rucksack-css'),
	postcssurl	   	= require('postcss-url'),
	reporter	 	= require("postcss-reporter"),
	sourcemaps	 	= require('gulp-sourcemaps');

var paths = {
	cssSource: './app/assets/styles/main.css',
	cssDest: './app/temp/styles'
}


gulp.task('styles', function(){

	return gulp.src(paths.cssSource)
		.pipe( sourcemaps.init())
		.pipe(postcss([
			require('postcss-partial-import')({prefix: '_', extension: '.css'}),
				postcssurl(),					
					cssnext(),
						rucksack(),
							require('postcss-nesting'),
								lost(), // lost must be after nesting, so that media queries can work with it
									reporter()
			]))
		.on('error', gutil.log, function(err){
			this.emit('end');
		})
  		.pipe(sourcemaps.write('./'))
  		.pipe(gulp.dest(paths.cssDest));
});		

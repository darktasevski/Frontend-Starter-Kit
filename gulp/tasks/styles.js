var gulp 		 	= require('gulp'),	
	lost			= require('lost'),
 	gutil 		 	= require('gulp-util'),
	postcss 	 	= require('gulp-postcss'),
	cssnext		 	= require('postcss-cssnext'),
	rucksack		= require('rucksack-css'),
	fontMagician	= require('postcss-font-magician'),
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
					require('postcss-normalize')({browsers: 'last 2 versions'}),	
						fontMagician(),	// https://github.com/jonathantneal/postcss-font-magician	 		
							cssnext(),	// http://cssnext.io/features/
								rucksack(), // http://simplaio.github.io/rucksack/docs/#
									require('postcss-nesting'),
										lost(), // lost must be after nesting, so that media queries can work with it http://lostgrid.org/lostgrid-example.html
											reporter()
			]))
		.on('error', gutil.log, function(err){
			this.emit('end');
		})
  		.pipe(sourcemaps.write('./'))
  		.pipe(gulp.dest(paths.cssDest));
});		

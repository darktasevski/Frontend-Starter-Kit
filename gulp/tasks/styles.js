var gulp 		 	= require('gulp'),	
	lost			= require('lost'),
	rucksackCss		= require('rucksack-css'),
	fontMagician	= require('postcss-font-magician');

var $ = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/, 
	lazy: true,
	camelize: true,
	scope: ['dependencies', 'devDependencies']
});

var errorCheck 		= function (err) {
	$.notify.onError({
		title: "Gulp error in " + err.plugin,
		message:  err.toString()
	})(err);
	$.util.beep();
	$.util.log(err);
};
//  Path Configuration	  
var paths = {
	cssSource: './app/assets/styles/main.css',
	cssDest: './app/temp/styles'
}

// Task
gulp.task('styles', function(){

	return gulp.src(paths.cssSource)
		.pipe($.plumber(function () {
			errorHandler: errorCheck
		}))
		.pipe($.sourcemaps.init())
		.pipe($.postcss([
			require('postcss-partial-import')({prefix: '_', extension: '.css'}),
				require('postcss-assets')({ basePath: `app`, loadPaths: ['assets/images']}), // assets url handling
					require('postcss-normalize')({browsers: 'last 2 versions'}),	
						fontMagician(),	// https://github.com/jonathantneal/postcss-font-magician	 		
							require("postcss-cssnext")(),	// http://cssnext.io/features/
								rucksackCss(), // http://simplaio.github.io/rucksack/docs/#
									require('postcss-nesting'),
										lost(), // lost must be after nesting, so that media queries can work with it http://lostgrid.org/lostgrid-example.html
											require("postcss-reporter")()
			]))
		.on('error', $.util.log, function(err){
			this.emit('end');
		})
  		.pipe($.sourcemaps.write('./'))
  		.pipe(gulp.dest(paths.cssDest));
});		

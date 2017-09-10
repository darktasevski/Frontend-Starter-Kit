var gulp 		 	= require('gulp'),	
	lost			= require('lost'),
	cssnext		 	= require('postcss-cssnext'),
	rucksackCss		= require('rucksack-css'),
	fontMagician	= require('postcss-font-magician'),
	postcssUrl	   	= require('postcss-url'),
	reporter	 	= require("postcss-reporter");
	
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

var $ = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/, 
	lazy: true,
	camelize: true,
	scope: ['dependencies', 'devDependencies']
});

// Task
gulp.task('styles', function(){

	return gulp.src(paths.cssSource)
		.pipe($.plumber(function () {
			errorHandler: errorCheck
		}))
		.pipe($.sourcemaps.init())
		.pipe($.postcss([
			require('postcss-partial-import')({prefix: '_', extension: '.css'}),
				postcssUrl(),
					require('postcss-normalize')({browsers: 'last 2 versions'}),	
						fontMagician(),	// https://github.com/jonathantneal/postcss-font-magician	 		
							cssnext(),	// http://cssnext.io/features/
								rucksackCss(), // http://simplaio.github.io/rucksack/docs/#
									require('postcss-nesting'),
										lost(), // lost must be after nesting, so that media queries can work with it http://lostgrid.org/lostgrid-example.html
											reporter()
			]))
		.on('error', $.util.log, function(err){
			this.emit('end');
		})
  		.pipe($.sourcemaps.write('./'))
  		.pipe(gulp.dest(paths.cssDest));
});		

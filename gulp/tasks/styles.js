
var gulp 		 	= require('gulp'),
	lost			= require('lost'),
 	// gutil 		 	= require('gulp-util'),
	// postcss 	 	= require('gulp-postcss'),
	cssnext		 	= require('postcss-cssnext'),
	rucksackCss		= require('rucksack-css'),
	fontMagician	= require('postcss-font-magician'),
	postcssUrl	   	= require('postcss-url'),
	// plumber			= require('gulp-plumber'),
	reporter	 	= require("postcss-reporter"),
	// sourcemaps	 	= require('gulp-sourcemaps'),
	errorCheck 		= function (err) {
		plugins.notify.onError({
			title: "Gulp error in " + err.plugin,
			message:  err.toString()
		})(err);
		plugins.util.beep();
		plugins.util.log(err);
	  };
	
	var plugins = require("gulp-load-plugins")({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/, 
		lazy: true,
		camelize: true,
		scope: ['dependencies', 'devDependencies']
	  });

var paths = {
	cssSource: './app/assets/styles/main.css',
	cssDest: './app/temp/styles'
}


gulp.task('styles', function(){

	return gulp.src(paths.cssSource)
		.pipe(plugins.plumber(function () {
			errorHandler: errorCheck
		}))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.postcss([
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
		.on('error', plugins.util.log, function(err){
			this.emit('end');
		})
  		.pipe(plugins.sourcemaps.write('./'))
  		.pipe(gulp.dest(paths.cssDest));
});		

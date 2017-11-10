var gulp 		 	= require('gulp'),	
	lost			= require('lost'),
	rucksackCss		= require('rucksack-css'),
	fontMagician	= require('postcss-font-magician'),
	onError 		= require( '../utilities/errorHandler');

var $ = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/, 
	lazy: true,
	camelize: true,
	scope: ['dependencies', 'devDependencies']
});

//  Path variables	  
var paths = {
	cssSource: './app/assets/styles/main.css',
	cssDest: './app/temp/styles'
}

// Task
gulp.task('styles', function(){

	return gulp.src(paths.cssSource)
		.pipe($.plumber({
			errorHandler: onError
		}))
		.pipe($.sourcemaps.init())
		.pipe($.postcss([
			require('postcss-partial-import')({prefix: '_', extension: '.css'}),
				require('postcss-assets')({ basePath: `app`, loadPaths: ['assets/images'], relative: 'assets/styles'}), // assets url handling
					require('postcss-normalize')({browsers: 'last 2 versions'}),
						fontMagician({hosted: ['./app/assets/fonts', './assets/fonts/'], foundries: ['google']}),	// https://github.com/jonathantneal/postcss-font-magician	 		
							require("postcss-cssnext")(),	// http://cssnext.io/features/
								rucksackCss(), // http://simplaio.github.io/rucksack/docs/#
									require('postcss-nesting'),
										lost(), // lost must be after nesting, so that media queries can work with it http://lostgrid.org/lostgrid-example.html
											require("css-mqpacker")({sort: true}),
												require("postcss-reporter")()
			]))
  		.pipe($.sourcemaps.write('./'))
		.pipe($.plumber.stop())
		.pipe(gulp.dest(paths.cssDest));
});		

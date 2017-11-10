var gulp 		= require('gulp'),
webpack	 		= require('webpack'),
gulpNotify 	= require('gulp-notify'),
gutil 			= require('gulp-util'),
notifier 		= require('node-notifier'),
onError 		= require( '../utilities/errorHandler');

gulp.task('scripts',['modernizr'], function(callback){
	webpack(require('../../webpack.config.js'), function(err, stats){
		if (stats.compilation.errors.length) {
				// Notifiers if errors
				notifier.notify({
				  title: 'Webpack error',
				  message: stats.compilation.errors[0].error.toString("utf8")
				});
			  }
		console.log(stats.toString());
		callback();
	});
})
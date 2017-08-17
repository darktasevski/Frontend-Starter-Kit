var gulp = require('gulp'),
webpack	 = require('webpack');

gulp.task('scripts',['modernizr'], function(callback){
	webpack(require('../../webpack.config.js'), function(err, stats){
		if(err){
			gutil.beep();
			gutil.log(err);
		}
		console.log(stats.toString());
		callback();
	});
})
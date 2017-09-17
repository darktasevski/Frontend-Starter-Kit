var gulp        = require('gulp'),
    modernizr   = require('gulp-modernizr');



gulp.task('modernizr', function() {
    return gulp.src('./app/assets/**/*.{css,js}')
        .pipe(modernizr({
            "cache" : true,
            "options": [
                "setClasses",
                "html5shiv"
            ]
        }))
        .pipe(gulp.dest('./app/temp/scripts/'));
});

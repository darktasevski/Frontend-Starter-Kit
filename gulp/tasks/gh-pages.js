var gulp 		= require('gulp'),
    del 		= require('del');


gulp.task('deleteDocs', function () { 
    return del('./docs');
 })

gulp.task('gh-pages', ['build', 'deleteDocs'], function () { 
    var toCopy = [
        './dist/**/*'
    ]
    return gulp.src(toCopy)
    .pipe(gulp.dest('./docs'));
 });
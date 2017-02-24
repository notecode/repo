var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
    port: 9000,
		livereload: true
	});
});

gulp.task('html', function () {
	return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
	  .pipe(connect.reload());
});
gulp.task('css', function () {
	return gulp.src('./src/**/*.css')
    .pipe(gulp.dest('./dist/'))
	  .pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.html'], ['html']);
	gulp.watch(['./src/**/*.css'], ['css']);
});

gulp.task('default', ['connect', 'html', 'css', 'watch']);

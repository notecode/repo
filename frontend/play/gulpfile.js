var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: 'src',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./src/**/*.html')
	.pipe(connect.reload());
});
gulp.task('css', function () {
	gulp.src('./src/**/*.css')
	.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.html'], ['html']);
	gulp.watch(['./src/**/*.css'], ['css']);
});

gulp.task('default', ['connect', 'html', 'css', 'watch']);

var gulp = require('gulp'),
    include = require('gulp-file-include'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./src/**/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist'))
	    .pipe(connect.reload());
});

gulp.task('js', function () {
	gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./dist'))
	    .pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.html'], ['html']);
	gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('all', ['html', 'js']);

gulp.task('default', ['connect', 'all', 'watch']);

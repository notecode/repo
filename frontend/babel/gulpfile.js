var gulp = require('gulp'),
	connect = require('gulp-connect');
	babel = require('gulp-babel');


gulp.task('connect', function() {
	connect.server({
		root: 'dist',
        port: '2222',
		livereload: true
	});
});
 
gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('babel', function() {
	return gulp.src('src/*.js')
 		.pipe(babel())
		.pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watch', ['html', 'babel'], function() {
    gulp.watch(['src/*.html'], ['html']);
    gulp.watch(['src/*.js'], ['babel']);
});

gulp.task('default', ['connect', 'watch']);

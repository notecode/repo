var gulp = require('gulp'),
    include = require('gulp-file-include'),
    sass = require('gulp-sass'),
	connect = require('gulp-connect');

gulp.task('connect', ['all'], function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('html-css', ['sass'], function () {
	return gulp.src('./src/**/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist'))
	    .pipe(connect.reload());
});

gulp.task('js', function () {
	return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./dist'))
	    .pipe(connect.reload());
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src'));
});

//gulp.task('css', ['sass'], function () {
//	gulp.src('./src/**/*.css')
//        .pipe(include())
//        .pipe(gulp.dest('./dist'))
//	    .pipe(connect.reload());
//});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.html', './src/**/*.scss'], ['html-css']);
	gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('all', ['html-css', 'js']);
gulp.task('default', ['connect', 'watch']);

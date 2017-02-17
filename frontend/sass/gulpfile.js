'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./src/**/*.html')
    .pipe(gulp.dest('dist/'))
	.pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('./src/sass/*.scss')
			.pipe(sass({includePaths: ['./src/sass/partials/']}).on('error', sass.logError))
			.pipe(gulp.dest('./dist/css'))
	        .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.html', ['html']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('clean', function () {
	gulp.src('dist', {read: false})
	.pipe(clean());
});

gulp.task('default', ['connect', 'html', 'sass', 'watch'])

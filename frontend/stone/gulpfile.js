'use strict';

// https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    include = require('gulp-file-include');

gulp.task('connect', ['all'], function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('vendor', function () {
	return gulp.src('./vendor/**/*')
        .pipe(gulp.dest('dist/vendor/'))
        .pipe(connect.reload());
});
gulp.task('pages', ['module-js'], function () {
	return gulp.src('./src/pages/**/*.+(html|js)')
        .pipe(include({basepath: './src/modules/', indent: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});
gulp.task('module-js', function () {
	return gulp.src('./src/modules/**/*.js')
//        .pipe(include({basepath: './src/modules/', indent: true}))
        .pipe(gulp.dest('dist/modules'))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('./src/sass/style.scss')
        .pipe(sass({includePaths: ['./src/modules/']}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./vendor/**/*', ['vendor']);
	gulp.watch('./src/**/*.+(html|js)', ['pages']);
	gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('clean', function () {
	gulp.src('dist', {read: false})
	.pipe(clean());
});

gulp.task('all', ['vendor', 'pages', 'sass']);
gulp.task('default', ['connect', 'watch']);

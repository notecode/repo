'use strict';

// https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    include = require('gulp-file-include');

gulp.task('connect', ['all'], function() {
	connect.server({
    host: 'notecode.com',
		root: 'dist',
		livereload: true
	});
});

gulp.task('vendor', function () {
	return gulp.src('./vendor/**/*')
        .pipe(gulp.dest('dist/vendor/'))
        .pipe(connect.reload());
});

gulp.task('pages', function () {
	return gulp.src('./src/pages/**/*.+(html|js)')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('images', function () {
	return gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
});

gulp.task('media', function () {
	return gulp.src('./src/media/**/*.*')
        .pipe(gulp.dest('dist/media'))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('./src/sass/style.scss')
        .pipe(sass({includePaths: ['./src/']}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});
gulp.task('global-js', function () {
	return gulp.src('./src/js/global.js')
        .pipe(include({basepath: './src/js/', indent: true}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());
});


gulp.task('watch', function() {
	gulp.watch('./vendor/**/*', ['vendor']);
	gulp.watch('./src/**/*.+(html|js)', ['pages']);
	gulp.watch('./src/images/**/*', ['images']);
	gulp.watch('./src/media/**/*', ['media']);
	gulp.watch('./src/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*', ['global-js']);
});

gulp.task('clean', function () {
	gulp.src('dist', {read: false})
	.pipe(clean());
});

gulp.task('all', ['vendor', 'pages', 'images', 'media', 'sass', 'global-js']);
gulp.task('default', ['connect', 'watch']);

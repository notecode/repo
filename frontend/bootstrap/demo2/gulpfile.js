var gulp = require('gulp'),
    clean = require('gulp-clean'),
	connect = require('gulp-connect');

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
gulp.task('css', function () {
	gulp.src('./src/**/*.css')
    .pipe(gulp.dest('dist/'))
	.pipe(connect.reload());
});
gulp.task('img', function () {
	gulp.src('./src/image/**/*')
    .pipe(gulp.dest('dist/image/'))
	.pipe(connect.reload());
});

gulp.task('vendor', function () {
	gulp.src('vendor/**/*')
    .pipe(gulp.dest('dist/vendor/'))
	.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['./src/**/*.html'], ['html']);
	gulp.watch(['./src/**/*.css'], ['css']);
	gulp.watch(['./src/image/**/*'], ['img']);
});

gulp.task('clean', function () {
	gulp.src('dist', {read: false})
	.pipe(clean());
});

gulp.task('default', ['connect', 'vendor', 'html', 'css', 'img', 'watch']);

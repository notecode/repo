var gulp = require('gulp'),
	foo = require('./foo-gulp.js');

console.log(foo);

gulp.task('foo', function () {
	gulp.src('./src/*')
		.pipe(foo('abc'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['foo']);


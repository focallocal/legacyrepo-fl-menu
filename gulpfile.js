var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var scopeCss = require("gulp-scope-css");

gulp.task('default', function () {
  gulp.src('./sass/index.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(uncss({
            html: ['fl-menu.html']
        }))
    .pipe(scopeCss('#fl-menu'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var scopeCss = require("gulp-scope-css");
var mustache = require("gulp-mustache");

gulp.task('default', ['sass','mustache']);

gulp.task('sass', function() {
  gulp.src('./sass/index.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(uncss({
            html: ['fl-menu.html']
        }))
    .pipe(scopeCss('#fl-menu'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css'));
})

gulp.task('mustache', function() {
  gulp.src("./fl-menu.html")
    .pipe(mustache())
    .pipe(gulp.dest("./dist/"));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

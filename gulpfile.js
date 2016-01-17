var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var scopeCss = require("gulp-scope-css");
var mustache = require("gulp-mustache");
var rename = require("gulp-rename");

//gulp.task('default', ['']);

gulp.task('sass', function() {
  gulp.src('./sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(scopeCss('#fl-menu'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('materialize', function() {

  // first make sure that all used icons are present in html file
  gulp.src("./fl-menu.html")
    .pipe(mustache("fl-menu.json"))
    .pipe(gulp.dest("./dist/"));

  // then compile materialize scss and clean using compiled html
  gulp.src('./sass/materialize/materialize.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(uncss({
                  "html": ['./dist/fl-menu.html']
                }))
    .pipe(rename('_materialize.css'))
    .pipe(gulp.dest('./sass/'));
});

gulp.task('compress', function() {
  uncss(['fl-menu.html'], function (error, output) {
    gulp.dest('./dist/fl-menu.html');
  });
})

gulp.task('mustache', function() {
    // declaring a task dependency didn't work.
    // https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support
    // so i have to run gulp mustache everytime after gulp sass
    gulp.src("./fl-menu.html")
      .pipe(mustache("fl-menu.json"))
      .pipe(gulp.dest("./dist/"));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

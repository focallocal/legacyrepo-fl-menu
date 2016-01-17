var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var scopeCss = require("gulp-scope-css");
var mustache = require("gulp-mustache");
var rename = require("gulp-rename");
var runSequence = require('run-sequence')

gulp.task('default', function(callback) {
  runSequence('mustache','materialize','sass','mustache',callback);
})

gulp.task('sass', function() {
  gulp.src('./sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(scopeCss('#fl-menu'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./mustache/'));
});

gulp.task('materialize', function() {

  // first make sure that all used icons are present in html file
  // task 'mustache' has to be run before this

  // then compile materialize scss and clean using compiled html
  gulp.src('./sass/materialize/materialize.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(uncss({
                  "html": ['./dist/fl-menu.html']
                }))
    .pipe(rename('_materialize.css'))
    .pipe(gulp.dest('./sass/'));
});

gulp.task('mustache', function() {
    // declaring a task dependency didn't work.
    // https://github.com/gulpjs/gulp/blob/master/docs/API.md#async-task-support
    // so i have to run gulp mustache everytime after gulp sass
    gulp.src("./mustache/fl-menu.mustache")
      .pipe(mustache("fl-menu.json"))
      .pipe(rename('fl-menu.html'))
      .pipe(gulp.dest("./dist/"));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

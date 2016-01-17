var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var scopeCss = require("gulp-scope-css");
var mustache = require("gulp-mustache");

//gulp.task('default', ['']);

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

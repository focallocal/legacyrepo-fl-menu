var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');

gulp.task('default', function () {
    gulp.src(['./lib/*.css','./*.css'])
        .pipe(concatCss("fl-menu.all.css"))
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));

    gulp.src(['lib/*.js','fl-menu.js'])
            .pipe(uglify())
            .pipe(concat('fl-menu.all.js'))
            .pipe(gulp.dest('dist'));

});
gulp.task('watch', function() {
  gulp.watch('fl-menu.*', ['default']);
});

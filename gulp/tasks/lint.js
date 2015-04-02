'use strict';

var gulp   = require('gulp')
,   eslint = require('gulp-eslint');

module.exports = function(config) {
  gulp.task('lint', function() {
    return gulp.src([
      config.get('paths.app.src.scripts.glob')])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  });
};
'use strict';

var gulp = require('gulp');

module.exports = function(config) {
  gulp.task('assets', function() {
    return gulp.src(config.get('paths.app.src.assets'))
      .pipe(gulp.dest(config.get('paths.app.build.assets')));
  });
};
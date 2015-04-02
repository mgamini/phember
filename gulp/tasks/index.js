'use strict';

var gulp     = require('gulp')
,   template = require('gulp-template');

module.exports = function(config) {
  gulp.task('index', function() {
    return gulp.src(config.get('paths.app.src.index'))
      .pipe(template({ env: config.get('env') }))
      .pipe(gulp.dest(config.get('paths.app.build.index')));
  })
};
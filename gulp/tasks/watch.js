'use strict';

var gulp  = require('gulp')
,   gutil = require('gulp-util')
,   watch = require('gulp-watch');

module.exports = function(config) {
  gulp.task('watch', function() {
    watch(config.get('paths.app.src.index'), function() {
      gulp.start('index');
    });

    // watch(config.get('paths.app.src.templates.glob'), function() {
    //   gulp.start('templates');
    // });

    watch(config.get('paths.app.src.scripts.glob'), function() {
      gulp.start(['bundle']);
    });

    watch(config.get('paths.app.src.styles.glob'), function() {
      gulp.start('styles');
    });
  });
};
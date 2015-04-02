'use strict';

var gulp        = require('gulp')
 ,   runSequence = require('run-sequence');

module.exports = function(config) {
  gulp.task('develop', function(callback) {
    runSequence(
      'build',
      'watch',
      callback
    );
  });
};
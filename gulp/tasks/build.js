'use strict';

var gulp        = require('gulp')
,   runSequence = require('run-sequence');

module.exports = function(config) {
  gulp.task('build', function(callback) {
    runSequence(
      ['clean', 'lint'],
      ['bundle', 'styles', 'assets', 'index'],
      callback
    );
  });
};
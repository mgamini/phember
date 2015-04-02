'use strict';

var gulp = require('gulp')
,   del  = require('del');

module.exports = function(config) {
  gulp.task('clean', function(callback) {
    del(config.get('paths.app.build.glob'), callback);
  });
};
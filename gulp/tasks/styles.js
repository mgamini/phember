'use strict';

var gulp         = require('gulp')
,   gulpif       = require('gulp-if')
,   sass         = require('gulp-sass')
,   csso         = require('gulp-csso')
,   autoprefixer = require('gulp-autoprefixer')
,   sourcemaps   = require('gulp-sourcemaps')
,   handleError  = require('../util/handle-error');

module.exports = function(config) {
  gulp.task('styles', function() {
    var production    = config.get('env') === 'production'
    ,   minify        = production
    ,   useSourceMaps = !production;

    return gulp.src(config.get('paths.app.src.styles.main'))
      .pipe(gulpif(useSourceMaps, sourcemaps.init()))
      .pipe(sass().on('error', handleError))
      .pipe(autoprefixer('last 1 version'))
      .pipe(gulpif(minify, csso()))
      .pipe(gulpif(useSourceMaps, sourcemaps.write()))
      .pipe(gulp.dest(config.get('paths.app.build.styles')));
  });
};


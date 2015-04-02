'use-strict';

var gulp    = require('gulp')
,   webpack = require('gulp-webpack');

module.exports = function(config) {
  gulp.task('bundle', function() {
    var webpackConfig = config.util.cloneDeep(config.get('webpack'));
    webpackConfig.watch = !!webpackConfig.watcher;
    delete webpackConfig.watcher;

    return gulp.src(config.webpack.entry)
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(config.webpack.output.path));
  });
};
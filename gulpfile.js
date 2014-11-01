var gulp = require('gulp');

// Include Our Plugins
var $ = require('gulp-load-plugins')()
, es = require('event-stream')
, bower = require('bower')
, bowermf = require('main-bower-files')
, path = require('path');

var PATHS = {
  bower: 'webapp/bower_components',
  publicjs: 'priv/static/js',
  appjs: 'webapp/app/**/*.js',
  templates: 'webapp/templates',
  scss: "./webapp/scss/style.scss",
  css: 'priv/static/css',
  images: 'webapp/static/images'
}

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// javascript
gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

gulp.task('vendor', ['bower'], function() {
    return gulp.src(bowermf())
      .pipe($.ignore.include('**/*.js'))
      .pipe($.changed(PATHS.publicjs))
      .pipe($.concat('vendor.js'))
      .pipe(gulp.dest(PATHS.publicjs))
      .pipe($.rename('vendor.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(PATHS.publicjs));
});

gulp.task('app', function() {
  return gulp.src(PATHS.appjs)
    .pipe($.order([
      "app.js",
      "lib/*.js",
      "**/*.js"
    ]))
    .pipe($.plumber())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(PATHS.publicjs))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe($.plumber.stop())
    .pipe(gulp.dest(PATHS.publicjs));
})

// css
gulp.task('styles', function () {
  return gulp.src(PATHS.scss)
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['priv/scss/'],
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(PATHS.css))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss())
    .pipe(gulp.dest(PATHS.css))
});


// html
gulp.task('templates', function(){
  return es.concat(
    gulp.src(PATHS.templates+'/**/*.em').pipe($.emberEmblem()).pipe($.defineModule('plain')),
    gulp.src(PATHS.templates+'/**/*.emblem').pipe($.emberEmblem()).pipe($.defineModule('plain')),
    gulp.src(PATHS.templates+'/**/*.hbs').pipe($.emberHandlebars({ outputType: 'browser' })))
    .pipe($.concat('templates.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(PATHS.publicjs));
});


// Default Task
gulp.task('default', ['app', 'templates', 'styles']);
gulp.task('firstrun', ['bower', 'vendor', 'app', 'templates', 'styles']);

gulp.task('watch', function() {
  gulp.watch('webapp/scss/**/*.scss', ['styles']);
  gulp.watch(PATHS.appjs, ['app'])
  gulp.watch(PATHS.templates + '**/*.hbs', ['templates']);
})
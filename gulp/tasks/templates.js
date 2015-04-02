'use strict';

var gulp       = require('gulp')
,   concat     = require('gulp-concat')
,   declare    = require('gulp-declare')
,   handlebars = require('gulp-handlebars')
,   emberhbs   = require('ember-handlebars');

module.exports = function(config) {
  gulp.task('templates', function() {
    gulp.src(config.get('paths.app.src.templates.glob'))
      .pipe(handlebars({
        handlebars: emberhbs
      }))
      .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        namespace: 'Ember.TEMPLATES',
        noRedeclare: true // Avoid duplicate declarations
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest(config.get('paths.app.build.templates')));
  });
};
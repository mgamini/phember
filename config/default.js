'use strict';

var path    = require('path')
,   webpack = require('webpack');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  loggerOptions: 'dev',
  paths: {
    app: {
      vendor: {
        bower: './app/vendor/bower_components',
        etc:   './app/vendor',
        glob:  './app/vendor/**/*.js'
      },
      src: {
        assets: './app/assets/**/*',
        index:  './app/index.html',
        root:   './app',
        scripts: {
          glob: './app/scripts/**/*.js',
          main: './app/scripts/app.js'
        },
        templates: {
          glob: './app/templates/**/*.hbs'
        },
        styles: {
          glob: './app/styles/**/*.scss',
          main: './app/styles/style.scss'
        }
      },
      build: {
        assets:    './app/build/assets',
        glob:      './app/build/**/*.*',
        index:     './app/build',
        root:      './app/build',
        scripts:   './app/build',
        styles:    './app/build',
        templates: './app/build'
      }
    },
    config: {
      root: './config'
    }
  },
  webpack: {
    debug: true,
    devtool: '#inline-source-map',
    entry: './app/scripts/app.js',
    module: {
      loaders: [
        { test: /\.hbs$/, loader: 'ember-templates' },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    output: {
      path: path.join(__dirname, '../priv/static'),
      filename: 'index.js'
    },
    resolve: {
      modulesDirectories: [path.join(__dirname, '../app/vendor/bower_components')],
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
      )
    ],
    watcher: false
  }
}

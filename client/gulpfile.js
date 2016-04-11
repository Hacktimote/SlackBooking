'use strict';

/**
 * Module dependencies
 */
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  path = require('path'),
  del = require('del'),
  open = require('open'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  webpackConfig = require('./webpack.config.js'),
  minimist = require('minimist');


var argv = minimist(process.argv.slice(2));
var src = Object.create(null);

var watch = false;


gulp.task('webpack', function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true
    }));

    callback();
  });
});

gulp.task('webpack-dev-server', function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;


  //myConfig.entry.app.
  myConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080');

  //publicPath: "/" + myConfig.output.publicPath,

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    contentBase: path.join(__dirname, 'app'),
    stats: {
      colors: true
    },
    proxy: {
      '/api/*': {
        target: 'http://hacktimote.site/',
        secure: false
      }
    }
  }).listen(8080, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);

    var startUrl = 'http://localhost:8080';
    open(startUrl);

    gutil.log('[webpack-dev-server]', startUrl);
  });
});


// Bundle
gulp.task('build:prod', function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);

  //myConfig.entry.devtool = 'inline';


  myConfig.plugins = myConfig.plugins.concat(
    new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin({
    //  sourceMap: false
    //}),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    })
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('clean', function (cb) {
  del([
    'www/**/*',
    '!www/.gitignore'
  ], {
    dot: true
  }, cb);
});

gulp.task('clean-all', function (cb) {
  del([
    'www/**/*',
    '!www/.gitignore',
    'node_modules',
    'build'
  ], {
    dot: true
  }, cb);
});

//gulp.task('install', ['webpack']);
gulp.task('watch', ['webpack-dev-server']);
gulp.task('default', ['install']);
gulp.task('build', ['clean', 'build:prod']);
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], //PhantomJS
    singleRun: false,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack' ]
    },
    reporters: [ 'mocha' ],
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-phantomjs-launcher"),
      require("karma-chrome-launcher"),
      require("karma-mocha-reporter")
    ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      }
    },
    webpackServer: {
      noInfo: true,
      quiet: true
    }
  });
};

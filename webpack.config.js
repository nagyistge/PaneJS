var webpack = require('webpack');
var path = require('path');
var pkg = require('./package');

var paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist')
};

var entry = {};
entry[pkg.name] = './src/index.js';
entry[pkg.name + '-' + pkg.version] = './src/index.js';

module.exports = {
  entry: entry,

  resolve: {
    extensions: ['', '.js']
  },

  output: {
    path: paths.dist,
    filename: '[name].js',
    library: pkg.name,
    libraryTarget: 'umd'
  },

  externals: {},

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-1']
        }
      }
    ]
  },

  plugins: [],

  devtool: 'source-map'
};

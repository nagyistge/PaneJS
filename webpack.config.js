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
      include: paths.src,
      loader: 'babel'
    }
    ]
  },

  plugins: [],

  devtool: 'source-map'
};

"babel-core": "^5.8.29",
    "babel-eslint": "^4.1.3",
    "babel-loader": "^5.3.2",
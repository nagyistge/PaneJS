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
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: [

            // Syntax
            //'syntax-class-properties',
            'syntax-export-extensions',

            // Experimental
            //'transform-class-properties',
            'transform-export-extensions',

            // Minification
            //'transform-member-expression-literals',
            //'transform-merge-sibling-variables',
            //'transform-minify-booleans',
            //'transform-property-literals',
            //'transform-remove-console',
            //'transform-remove-debugger',
            //'transform-simplify-comparison-operators'
          ]
        }
      }
    ]
  },

  plugins: [],

  devtool: 'source-map'
};

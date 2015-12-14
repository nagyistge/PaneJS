var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./webpack.config.js');
var pkg = require('./package');

delete config.entry[pkg.name];
delete config.devtool;

module.exports = config;

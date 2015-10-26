var pkg = require('./package');
var webpack = require('webpack');
var config = require('./webpack.config.js');

delete config.entry[pkg.name];
delete config.devtool;

module.exports = config;

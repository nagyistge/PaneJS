var webpack = require('webpack');
var config  = require('./webpack.config.js');
var pkg     = require('./package');

delete config.entry[pkg.name];
delete config.devtool;

module.exports = config;

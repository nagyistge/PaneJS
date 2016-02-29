#!/usr/bin/env node

var path = require('path');
var open = require('opn');
var pkg = require('../package');
var config = require('../webpack.config');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');


// server
var port = 7070;
var host = '127.0.0.1';
var wwwRoot = path.resolve(__dirname, '../');

// the dev entry
var entry = config.entry[pkg.name];

// remove the redundancy entry
delete config.entry[pkg.name + '-' + pkg.version];

// config the dev server
//config.entry[pkg.name] = [
//  'webpack-dev-server/client?http://' + host + ':' + port,
//  'webpack/hot/dev-server',
//  entry
//];


//config.plugins.push(
//  new webpack.HotModuleReplacementPlugin(),
//  new webpack.NoErrorsPlugin()
//);

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: wwwRoot,
  publicPath: config.output.publicPath,
  //hot: true,
  //noInfo: false,
  //historyApiFallback: true,
  stats: {
    cached: false,
    exclude: [
      /node_modules[\\\/]/
    ],
    colors: true
  }
});


server.listen(port, host);

#!/usr/bin/env node


var pkg = require('../package');
var config = require('../webpack.config');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');


// server
var port = 9090;
var host = '127.0.0.1';

// the dev entry
var entry = config.entry[pkg.name];

// remove the redundancy entry
delete config.entry[pkg.name + '-' + pkg.version];

// config the dev server
config.entry[pkg.name] = [
  'webpack-dev-server/client?http://localhost:' + port,
  'webpack/hot/dev-server',
  entry
];


config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: __dirname,
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true,
  stats: {
    colors: true
  }
});


server.listen(port, host);

server.listeningApp
  .on('listening', function () {

    var target = 'http://' + host + ':' + port;

    console.log('Dev server started on: ' + target);

  })
  .on('error', function (err) {

    if (err.code === 'EADDRINUSE') {
      console.log('Port ' + port + ' is already in use by another process.');
    } else {
      console.log(err);
    }

    process.exit(err.code);
  });

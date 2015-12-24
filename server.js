var pkg = require('./package');
var webpack = require('webpack');
var config = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');


var port = 9090;
var entry = config.entry[pkg.name];

delete config.entry[pkg.name + '-' + pkg.version];

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

server.listen(port, 'localhost', function (err, result) {

    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:' + port);
});

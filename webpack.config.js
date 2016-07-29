var pkg          = require('./package');
var path         = require('path');
var webpack      = require('webpack');
var ExtractText  = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');


var paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

var entry = {};

entry[pkg.name]                     = './src/index.js';
entry[pkg.name + '-' + pkg.version] = './src/index.js';

entry[pkg.name + '-pai']          = './src/pai.js';
entry[pkg.name + '-pai-0.1.5']    = './src/pai.js';
entry[pkg.name + '-myData-0.1.0'] = './src/myData.js';

module.exports = {

    entry: entry,

    resolve: {
        extensions: ['', '.js']
    },

    output: {
        path: paths.dist,
        publicPath: '/dist/',
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
                    babelrc: false,
                    cacheDirectory: true,
                    presets: ['es2015'],
                    plugins: [

                        // Syntax
                        //'syntax-class-properties',
                        //'syntax-export-extensions',

                        // Experimental
                        //'transform-class-properties',
                        //'transform-export-extensions',

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
            }, {
                test: /\.less?$/,
                include: paths.src,
                loader: ExtractText.extract(
                    'css-loader?sourceMap&-minimize!' +
                    'postcss-loader!' +
                    'less-loader?sourceMap'
                )
            }
        ]
    },

    plugins: [
        new ExtractText('[name].css')
    ],

    postcss: function () {
        return [autoprefixer({ browsers: ['last 2 versions'] })];
    },

    devtool: 'source-map'
};

require('es6-promise').polyfill();
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    modules : path.join(__dirname,'node_modules')
};

process.env.BABEL_ENV = TARGET;

var common = {
    entry : PATHS.app,
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias :{
            modal_css : PATHS.modules + '/css-modal/build/modal.css'
        }
    },
    output : {
        path : PATHS.build,
        filename : (!TARGET || TARGET !== 'build') ? 'bundle.js' : 'bundle.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!",
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            }
        ]
    },
    plugins : [
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title : 'Easy Meme Maker App',
            appMountId: 'app'
        })
    ]
}

if(TARGET === 'start' || !TARGET){
    module.exports = merge(common,{
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}

if(TARGET === 'build') {
    console.log('begin build....');
    module.exports = merge(common, {
        plugins : [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}
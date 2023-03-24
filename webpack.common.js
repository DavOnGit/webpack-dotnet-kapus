const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPaths = require('./paths');

module.exports = {
    entry: {
        application: appPaths.jsDir + 'root',
    },
    // 🔔 Just to be sure Webpack picks up the right file type ✨
    resolve: {
        extensions: ['.js', '.json'],
        symlinks: false
    },
    context: path.resolve(__dirname),
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'esbuild-loader',
                include: path.join(__dirname, appPaths.jsDir),
                exclude: (path) => path.match(/node_modules/),
                options: {
                    // JavaScript version to compile to ᓚᘏᗢ
                    target: 'es2015'
                }
            },
            {
                // 🔔 imagess with size < 'maxSize' will be embedded as data URI 🚀
                test: /\.(png|jpg|gif|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 5 * 1024 // 5kb
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' // 🔔 For Angular
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'Views/Shared/_Layout.cshtml'),
            inject: false, // 🔔 we inject manually into _LayoutTemplate.cshtml
            //scriptLoading: 'defer',
            //cache: false,
            template: path.resolve(__dirname, 'Views/Shared/_LayoutTemplate.cshtml'),
            minify: false
        }),
        // This plugin which will move all common code into a 'vendor' file
        //new webpack.optimize.CommonsChunkPlugin({
        //    name: 'vendor'
        //})
    ]
};

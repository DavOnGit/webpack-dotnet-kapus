const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const common = require('./webpack.common.js');
const appPaths = require('./paths');

const distFolder = path.resolve(__dirname, appPaths.distDir);

console.log('Node version: ', process.versions.node)

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    stats: {
        errorDetails: true,
        children: true
    },
    output: {
        // 🔔 The format for the outputted files
        filename: '[name].js',
        path: distFolder,
        assetModuleFilename: 'assets/[name][ext][query]',
        asyncChunks: true,
        clean: true
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        static: distFolder,
        liveReload: false,
        hot: 'only',
        //historyApiFallback: true,
        devMiddleware: {
            index: false,
            publicPath: distFolder,
            serverSideRender: false,
            writeToDisk: true,
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: false
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin({ dry: false }),
    ],
    optimization: {
        //emitOnErrors: true,
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
    module: {
        rules: [
            {
                test: /\.((sa|sc|c)ss)$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 🔔 Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                            // 🔔 If you need run `sass-loader` and `postcss-loader` on each CSS `@import` set it to `2`
                            importLoaders: 1,
                            sourceMap: true
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    [
                                        // ⚠ any modification to postCssPresetEnv plugin should be manually updated to webpack.prod.js
                                        postcssPresetEnv({
                                            stage: 3,
                                            browsers: ['last 3 versions', 'not dead', '> 0.5%'],
                                            // List of features available: https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md
                                            /*features: {
                                                'nesting-rules': true
                                            },*/
                                            preserve: false,
                                            debug: false
                                        }),
                                    ]
                                ]
                            }
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass-embedded'),
                            sourceMap: true
                        }
                    },
                ],
            }
        ]
    }
});

const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostcssPresetEnv = require('postcss-preset-env');
const ESLintPlugin = require('eslint-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');

const common = require('./webpack.common.js');
const appPaths = require('./paths');

console.log('Node version: ', process.versions.node);

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        // The format for the outputted files
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, appPaths.distDir),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },
    plugins: [
        new ESLintPlugin({
            cache: true,
            failOnError: true,
            failOnWarning: false,
            threads: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    optimization: {
        minimizer: [
            new EsbuildPlugin({
                target: 'es2015',
                css: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
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
                                        // ⚠ any modification to postCssPresetEnv plugin should be manually updated to webpack.dev.js
                                        PostcssPresetEnv({
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
                        options: { sourceMap: true }
                    },
                ],
            }
        ]
    },
    performance: {
        maxAssetSize: 1000000,
        maxEntrypointSize: 600000
    },
    //stats: {
    //    errorDetails: true,
    //    children: true
    //},
});

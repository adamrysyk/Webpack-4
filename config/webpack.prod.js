const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/main.js']
    },
    mode: 'production',
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCSSExtractPlugin.loader
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    attrs: ['img:src']
                }
            }]
        }, {
            test: /\.(jpg|gif|png)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new OptimizeCssAssetsPlugin(),
        new MiniCSSExtractPlugin({
            filename: "[name]-[contenthash].css"
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
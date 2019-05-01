const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = env => {

    return {
        entry: {
            main: [
                'babel-register',
                './src/main.js'
            ]
        },
        mode: 'production',
        output: {
            filename: '[name]-bundle.js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: "/"
        },
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
                template: './src/index.ejs',
                inject: true,
                title: 'Mochi\'s Journal'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env.NODE_ENV)
                }
            }),
            new UglifyJSPlugin()
        ]
    }
};
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/main.js']
    },
    mode: 'development',
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    devServer: {
        contentBase: 'dist',
        overlay: true, // shows errors as overlay in browser
        hot: true,
        stats: {
            colors: true // shows colors in terminal console
        }
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
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.sass/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
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
                    name: 'images/[name]-[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.pug$/,
            use: [{
                loader: 'pug-loader'
            }]
        }, {
            test: /\.hbs/,
            use: [{
                loader: 'handlebars-loader',
                query: {
                    inlineRequires: '/images/'
                }
            }]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.ejs', // change to .ejs or .pug to test other html preprocessors
            title: 'Mochi\'s Journal'
        })
    ]
};
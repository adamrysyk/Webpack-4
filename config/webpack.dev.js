const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/main.js'],
        polyfills: ["./src/angular-polyfills"],
        angular: ['./src/angular']
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    mode: 'development',
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    devServer: {
        contentBase: 'dist',
        historyApiFallBack: true, // for angular routing (not used in this project)
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
            test: /\.ts$/,
            use: [{
                loader: 'awesome-typescript-loader'
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/core)/,
            path.join(__dirname, './src'),
            {}
        ),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
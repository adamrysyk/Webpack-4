import express from 'express';
import path from 'path';

const webpack = require('webpack');
const config = require('../../config/webpack.dev.js');
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
const staticMiddleware = express.static('dist');

const server = express();

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(staticMiddleware);

server.listen(7000, () => {
    console.log('Server is listening on port 7000.');
});
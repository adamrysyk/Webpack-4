import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AppRoot from '../components/AppRoot.js';

const isProd = process.env.NODE_ENV === 'production';

const server = express();

if (!isProd) {
    const webpack = require('webpack');
    const config = require('../../config/webpack.dev.js');
    const compiler = webpack(config);

    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        config.devServer
    );

    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddleware);
}

const expressStaticGzip = require('express-static-gzip');
server.use(expressStaticGzip('dist', {
    enableBrotli: true
}));

server.get('*', (req, res) => {
    res.send(`
        <html>
            <head>
                <link href="/main.css" rel="stylesheet" />
            </head>
            <body>
                <div id="react-root">
                    ${ReactDOMServer.renderToString(<AppRoot />)}
                </div>
                <script src="vendor-bundle.js"></script>
                <script src="main-bundle.js"></script>
            </body>
        </html>
    `);
})

const PORT = process.env.PORT || 7000

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}.`);
});
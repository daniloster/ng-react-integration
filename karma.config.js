/* eslint-disable */
var webpackConfig = require('./webpack.config'),
    path = require('path');

function initKarma(config) {
    config.set({
        frameworks: ['jasmine'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        basePath: path.resolve(__dirname),
        files: [
            require.resolve('phantomjs-polyfill'),
            { pattern: './src/**/*-test.js', watched: false }
        ],
        exclude: [
        ],
        preprocessors: {
            './src/**/*-test.js': ['webpack'],
            './src/**/*.js': ['webpack']
        },
        plugins: [
            'karma-jasmine',
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-phantomjs-shim',
            'karma-sourcemap-loader'
        ]
    });
}
module.exports = initKarma;
/* eslint-enable */

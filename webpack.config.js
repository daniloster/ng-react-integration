/* eslint-disable */
var path = require('path'),
    autoprefixer = require('autoprefixer')
    webpack = require('webpack'),

    isTest = process.env.NODE_ENV === 'test',
    isProd = process.env.NODE_ENV === 'production',
    isDev = process.env.NODE_ENV === 'dev',

    styleLoader = ['style'].concat(isProd ? [] : ['?sourceMap']).join(''),
    cssLoader = [
        'css?minimaze&camelCase&modules&importLoaders=1'
    ].concat(
        isProd
            ? ['&localIdentName=[hash:base64:32]']
            : ['&sourceMap', '&localIdentName=[name]--[local]']
    ).join(''),
    sassLoader = [
        'sass'
    ].concat(
        isProd
            ? []
            : ['?sourceMap']
    ).join(''),
    postcssLoader = ['postcss'].concat(isProd ? [] : ['?sourceMap']).join(''),
    resolveUrlLoader = ['resolve-url'].concat(isProd ? [] : ['?sourceMap']).join(''),

    urlLoader = 'url?limit=10000',
    imgLoader = 'img',

    webpackConfig = {
        plugins: [],
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'source-map'
                }
            ],
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015', 'stage-0', 'airbnb']
                    }
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'eslint'
                },
                {
                    test: /\.css$/,
                    include: /src|DEV/,
                    loaders: [styleLoader, cssLoader, resolveUrlLoader, postcssLoader]
                },
                {
                    test: /\.scss$/,
                    include: /src|DEV/,
                    loaders: [styleLoader, cssLoader, resolveUrlLoader, sassLoader, postcssLoader]
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    loaders: [urlLoader, imgLoader]
                },
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: urlLoader
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                }
            ]
        },
        postcss: function () {
            return [autoprefixer];
        }
    };

if (!isProd) {
    webpackConfig.devtool = 'inline-source-map';
}

if (isTest) {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      // Force HTMLtoJSX to use the in-browser `document` object rather than
      // require the Node-only "jsdom" package.
      IN_BROWSER: true
    }));
    webpackConfig.externals = {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    };
} else {
    webpackConfig.entry = {
        'ng-reactify': [
            require.resolve('babel-polyfill'),
            isDev ? './DEV/index.js' : './index.js'
        ]
    };
    webpackConfig.output = {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    };
}

module.exports = webpackConfig;
/* eslint-enable */

// Generated using webpack-cli https://github.com/webpack/webpack-cli
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/worker.ts',
    output: {
        path: path.resolve(__dirname, 'public/build'),
    },
    externals: {
    'postcss-load-config': 'postcss-load-config',
    'stylus': 'stylus',
    'typescript': 'root typescript'
    },
    plugins: [
        new NodePolyfillPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: /node_modules|\.d\.ts$/,
                options: { allowTsInNodeModules: true }
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "fs": require.resolve("browserify-fs"),
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": require.resolve("stream-browserify"),
            "crypto": false,
            //"crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        } 
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};

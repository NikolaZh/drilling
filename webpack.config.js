// const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

// const config = {
//     entry: `${SRC_DIR}/app/index.js`,
//     output: {
//         path: `${DIST_DIR}/app`,
//         filename: 'bundle.js',
//         publicPath: '/app/',
//     },
//     module: {
//         rules: [{
//             test: /\.js?/,
//             include: SRC_DIR,
//             loader: 'babel-loader',
//             use: ['react'],

//         }],
//     },
// };

// module.exports = config;

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2017', 'react'],
                },
            },
        }],
    },
    entry: `${SRC_DIR}/app/index.js`,
    output: {
        path: `${DIST_DIR}/app/`,
        filename: 'bundle.js',
        publicPath: '/app/',
    },
};

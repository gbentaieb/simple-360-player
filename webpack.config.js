/* eslint-env node */
const path = require('path');

const PROJECT_ENV = process.env.PROJECT_ENV || 'production';

if (['development', 'production'].indexOf(PROJECT_ENV) < 0) {
  throw new Error(`unknown PROJECT_ENV ${PROJECT_ENV}`);
}

const webpack = require('webpack');

module.exports = {
  output: {
    library: 'Simple360Player',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015-loose'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      main: `${__dirname}/src`,
      test: `${__dirname}/test`,
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: PROJECT_ENV === 'development',
      'process.env': {
        NODE_ENV: JSON.stringify(PROJECT_ENV),
      },
    }),
  ],
  node: {
    console: false,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
};

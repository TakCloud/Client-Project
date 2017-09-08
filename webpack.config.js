//Generally a good practice to import webpack
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: {
    app: ['./index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/client/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', 'jsonp'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react','stage-0'],
          plugins: [ "transform-class-properties" ]
        },
      },
      {
        test: /jsx?/,
        exclude: /node_modules/,
        loaders: ['eslint-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     { loader: "style-loader" }, 
      //     { loader: "css-loader" }, 
      //     { loader: "sass-loader" }
      //   ],
      // },
    ],
  },
};

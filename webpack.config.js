const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/client'),
    publicPath: '/client',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015', 'react',
          ],
          plugins: ['transform-class-properties'],
        },
      },
      {
        test: /jsx?/,
        exclude: /node_modules/,
        loaders: ['eslint-loader'],
      },
    ],
  },
};

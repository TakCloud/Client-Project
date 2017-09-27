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
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /jsx?/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-class-properties', 'transform-es3-property-literals', 'transform-es3-member-expression-literals'],
        },
      },
      {
        test: /jsx?/,
        exclude: /node_modules/,
        loaders: ['eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};

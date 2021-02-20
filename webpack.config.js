const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`,
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/js/index.jsx'),
  },
  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Estate Agent',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
  ],
  module: {
    rules:
      [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|eot|woff|ttf)$/i,
        loader: 'file-loader',
        options: {
          name: "[path]/[name].[ext]",
          context: "src"

        }
      }
      ],
  },
};
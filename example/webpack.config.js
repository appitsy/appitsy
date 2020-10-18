const path = require('path');
const express = require('express');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => ({
  mode: env.mode || 'development',
  devtool: 'eval-source-map',
  entry: ['react-hot-loader/patch','./src/index.tsx'],
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.json', '.tsx', '.js'],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    port: '3001',
    historyApiFallback: {
      // This is to handle '.' in the routes
      rewrites: [
        {
          from: /\/resetPassword\//,
          to: '/index.html',
        },
      ],
    },
    setup(app) {
      // this is to serve static files from the folder ./src/static
      app.use(express.static('./src/static'));
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules|\.d\.ts$/,
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader',
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
});

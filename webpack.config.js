const path = require('path');
const express = require('express');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

module.exports = (env) => ({
  mode: env.mode || 'development',
  devtool: 'eval-source-map',
  entry: ['./src/index.tsx'],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    library: pkg.name,
    libraryTarget: 'commonjs2',
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.json', '.tsx', '.js'],
    modules: [path.resolve(__dirname, './src')],
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
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    // }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/themes', to: 'themes' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: ['file-loader'],
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: ['file-loader'],
      // },
      {
        test: /\.scss$/,
        use: ['file-loader'],
      },
    ],
  },
});

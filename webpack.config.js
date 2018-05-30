const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = process.env.PORT || 4000;

module.exports = {
  mode: 'development',
  entry: ['whatwg-fetch', './src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: false,
      },
      hash: true,
    }),
    new ExtractTextPlugin({
      filename: 'styles/styles.css',
      allChunks: true
    })
  ],
  module: {
    rules: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        // We configure 'Extract Text Plugin'
        use: ExtractTextPlugin.extract({
          // loader that should be used when the
          // CSS is not extracted
          fallback: 'style-loader',
          use: ['css-loader']

        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'styles/[name].[ext]',
            context: ''}
          }
        ]
      }
    ],
  },
  devServer: {
    contentBase: "./dist",
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }

};
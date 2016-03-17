/**
 * Created by franciosdelpech on 3/14/16.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: './src'
  },
  entry: {
    app: './src'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { cacheDirectory: true }
      },{
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      }
    ]
  },
  output: {
    filename: 'app.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-native': 'react-native-web'
    }
  }
};
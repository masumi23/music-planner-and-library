var path = require('path');
var webpack = require('webpack');

// var node_modules = path.resolve(__dirname, 'node_modules');
// var pathToReact = path.resolve(node_modules, 'react/dist/react-with-addons.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './app/main.js'
  ],
  // resolve: {
    // alias: {
    //   'react': pathToReact
    // }
  // },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css"),
    // new HtmlWebpackPlugin({
    //   title: 'Custom template',
    //   template: 'index.html', // Load a custom template
    //   inject: 'body' // Inject all scripts into the body
    // })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      // exclude: [node_modules],
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.css$/, // Only .css files
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
    }
    ]
  }
};


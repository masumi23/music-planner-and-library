var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules],
      loader: 'babel'
    }, {
      test: /\.css$/, // Only .css files
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
    }],
    noParse: [pathToReact]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};

module.exports = config;

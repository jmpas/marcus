const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('css-loader!stylus-loader') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader') },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader',
          { loader: 'image-webpack-loader'}
        ]
      }
    ]
  },
  plugins: [ new ExtractTextPlugin('bundle.css') ]
};

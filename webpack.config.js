const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const imagesData = require('./src/_images.json')
const portraitsData = require('./src/_portraits.json')

const indexAssets = path.resolve('src/index.js')
const indexTemplates = path.resolve('src/index.pug')
const portraitsTemplates = path.resolve('src/portraits.pug')

module.exports = {
  entry: [indexAssets, indexTemplates, portraitsTemplates],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: { progressive: true },
              optipng: { optimizationLevel: 7 },
              gifsicle: { interlaced: false },
              pngquant: { quality: '65-90', speed: 4 }
            }
          }
        ]
      },
      {
        test: /index.pug/,
        loaders: [
          { loader: 'file-loader', options: { name: 'index.html' } },
          'extract-loader',
          { loader: 'html-loader', options: { interpolate: true } },
          { loader: 'pug-html-loader', options: { data: imagesData } }
        ]
      },
      {
        test: /portraits.pug/,
        loaders: [
          { loader: 'file-loader', options: { name: 'portraits/index.html' } },
          'extract-loader',
          { loader: 'html-loader', options: { interpolate: true } },
          { loader: 'pug-html-loader', options: { data: portraitsData } }
        ]
      },
      { test: /animOnScroll/, loader: 'script-loader' }
    ]
  },
  plugins: [ new ExtractTextPlugin('bundle.css') ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  }
};

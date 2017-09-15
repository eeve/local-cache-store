const webpack = require('webpack')
const merge = require('webpack-merge')
const conf = require('./webpack.config')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = merge(conf, {
  entry: {
    app: path.resolve(__dirname, '../src/index')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'CacheStore',
    umdNamedDefine: true
  },
  externals: {
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    // 在 plugin 中添加
    new CompressionWebpackPlugin({ // gzip 压缩
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'    // 压缩 js 与 css
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})

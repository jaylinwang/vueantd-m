/**
 * ----------------------------------------------
 * webpack config for dev
 * author: Jaylin Wang
 * ----------------------------------------------
 */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const distRoot = path.resolve(__dirname, '../examples/assets')

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../examples/index.js')
  },
  output: {
    path: distRoot,
    publicPath: '/assets/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader']
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'images/[name].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[ext]'
      }
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      }
    }, {
      test: /\.vue/,
      loader: 'vue-loader',
      exclude: /node_modules/,
      options: {
        loaders: {
          js: 'babel-loader'
        },
        buble: {
          presets: ['es2015']
        }
      }
    }]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, '../examples'),
    compress: true,
    port: 3100
    // host: '192.168.8.3'
  },
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ]
}

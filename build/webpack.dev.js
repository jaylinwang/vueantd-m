/**
 * ----------------------------------------------
 * webpack config for dev
 * author: Jaylin Wang
 * ----------------------------------------------
 */
const path = require('path')

const distRoot = path.resolve(__dirname, '../dist')

module.exports = {
  entry: {
    'vueantd-m': path.resolve(__dirname, '../src/components/index.js')
  },
  output: {
    path: distRoot,
    filename: '[name].js',
    library: 'vueantd-m',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
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
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  }
}

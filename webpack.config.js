const path = require('path')
const webpack = require('webpack')

module.exports = (env) => ({
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react','stage-0']
        }
      }
    ]
  }
})

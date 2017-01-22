const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js'
  },

  watch: NODE_ENV === 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : null,

  devServer: {
    contentBase: "./"
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: NODE_ENV
    })
  ]
};
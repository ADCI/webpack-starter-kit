const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',

  entry: {
    main: './js/main.js'
  },
  output: {
    path: __dirname + '/dist/js',
    public: '/js/',
    filename: '[name].js'
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
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: JSON.stringify("en")
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    })
  ],

  resolve: {
    root: __dirname + '/src/js/vendor',
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: __dirname + '/src/js',
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'es2016'],
        cacheDirectory: true,
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.css$/,
      include: __dirname + '/src/postcss',
      loaders: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader'
      ]
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.twig$/,
      loader: 'twig-loader'
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      include: /\/node_modules\//,
      loader: 'file?name=[1].[ext]&regExp=node_modules/(.*)'
    }, {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      exclude: /\/node_modules\//,
      loader: 'url?name=[path][name].[ext]&limit=4096'
    }
    ]
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}
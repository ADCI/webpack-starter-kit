import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import postcssCalc from 'postcss-calc';
import stripInlineComments from 'postcss-strip-inline-comments';
import cssMqpacker from 'css-mqpacker';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssReporter from 'postcss-reporter';
import cssnano from 'cssnano';

const NODE_ENV = process.env.NODE_ENV || 'development';
const extractPostcss = new ExtractTextPlugin({filename: './../css/[name].css', disable: false, allChunks: true});
const supportedBrowsers = [
  '> 0.5%',
  'last 2 versions',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.1',
  'bb >= 10'
];
const postcssProcessors = [
  precss,
  stripInlineComments,
  postcssCalc,
  postcssFlexbugsFixes,
  autoprefixer({
    browsers: supportedBrowsers,
    cascade: false
  }),
  cssMqpacker({ sort: true }),
  cssnano({
    autoprefixer: false,
    calc: true,
    colormin: true,
    convertValues: true,
    core: true,
    discardComments: false,
    discardDuplicates: true,
    discardEmpty: true,
    discardOverridden: true,
    discardUnused: true,
    filterOptimiser: true,
    functionOptimiser: true,
    mergeIdents: true,
    mergeLonghand: true,
    mergeRules: true,
    minifyFontValues: true,
    minifyGradients: true,
    minifyParams: true,
    minifySelectors: true,
    normalizeCharset: true,
    normalizeUrl: true,
    orderedValues: true,
    reduceBackgroundRepeat: true,
    reduceIdents: true,
    reduceInitial: true,
    reducePositions: true,
    reduceTimingFunctions: true,
    reduceTransforms: true,
    uniqueSelectors: true,
    zindex: false
  })
];

module.exports = () => {
  return {
    context: path.resolve(__dirname, 'src'),

    entry: {
      main: './js/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      publicPath: '',
      filename: '[name].js'
    },

    watch: NODE_ENV === 'development',

    devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : null,

    devServer: {
      contentBase: "./"
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: __dirname + '/src/js',
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'es2016'],
            cacheDirectory: true,
            plugins: ['transform-runtime']
          }
        },
        {
          test: /\.css$/,
          use: extractPostcss.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => postcssProcessors,
                  syntax: 'postcss-scss'
                }
              }
            ]
          })
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader'
        },
        {
          test: /\.twig$/,
          loader: 'twig-loader'
        },
        {
          test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
          include: /\/node_modules\//,
          loader: 'file?name=[1].[ext]&regExp=node_modules/(.*)'
        },
        {
          test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
          exclude: /\/node_modules\//,
          loader: 'url?name=[path][name].[ext]&limit=4096'
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
        LANG: JSON.stringify("en")
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "common"
      }),
      extractPostcss
    ]
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}
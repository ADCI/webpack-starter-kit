import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import postcssNext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import doIUse from 'doiuse';
import postcssReporter from 'postcss-reporter';
import cssnano from 'cssnano';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const extractStyles = new ExtractTextPlugin('./css/[name].css');

const supportedBrowsers = [
  '> 0.5%',
  'last 2 versions'
];
const postcssProcessors = [
  postcssImport,
  postcssExtend,
  postcssNext({ browsers: supportedBrowsers }),
  doIUse({
    browsers: supportedBrowsers
  }),
  postcssReporter({ clearReportedMessages: true })
];
const postcssProcessorsProd = [
  postcssImport,
  postcssExtend,
  postcssNext({ browsers: supportedBrowsers }),
  doIUse({
    browsers: supportedBrowsers
  }),
  cssMqpacker({ sort: true }),
  cssnano({
    autoprefixer: false
  }),
  postcssReporter({ clearReportedMessages: true })
];
const scssProcessors = [
  autoprefixer({
    browsers: supportedBrowsers,
    cascade: false
  }),
  doIUse({
    browsers: supportedBrowsers
  }),
];
const scssProcessorsProd = [
  autoprefixer({
    browsers: supportedBrowsers,
    cascade: false
  }),
  doIUse({
    browsers: supportedBrowsers
  }),
  cssMqpacker({ sort: true }),
  cssnano({
    autoprefixer: false
  }),
];

module.exports = env => {
  return {

    context: path.resolve(__dirname, 'src'),

    entry: {
      main: './app.js'
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].js'
    },

    watch: env.dev,

    devtool: env.dev ? 'cheap-module-eval-source-map' : false,

    devServer: {
      contentBase: path.join(__dirname, "dist"),
      watchContentBase: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src/js'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'es2016'],
                cacheDirectory: true,
                plugins: ['transform-runtime']
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                emitWarning: true,
                configFile: '.eslintrc'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: path.resolve(__dirname, 'src/fonts'),
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: 'inline',
                  plugins: () => postcssProcessors
                }
              }
            ]
          })
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src/fonts'),
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  import: false,
                  url: false
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: 'inline',
                  plugins: () => postcssProcessors
                }
              }
            ]
          })
        },
        {
          test: /\.scss$/,
          use: extractStyles.extract({
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: 'inline',
                  plugins: () => scssProcessors
                }
              },
              {
                loader: "sass-loader"
              }
            ]
          })
        },
        {
          test: /\.pug$/,
          use: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              options: {
                exports: false
              }
            }
          ]
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './assets/[name].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                progressive: true,
                pngquant: {
                  quality: '75-90',
                  speed: 4
                },
                mozjpeg: {
                  quality: 75
                },
                gifsicle: {
                  interlaced: true
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: './assets/[name].[ext]'
              }
            }
          ]
        },
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        LANG: JSON.stringify("en")
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: "common"
      }),

      new HtmlWebpackPlugin({
        template: 'pug/index.pug'
      }),

      extractStyles,

      new StyleLintPlugin({
        configFile: '.stylelintrc',
        context: 'src/postcss',
        files: '**/*.css',
        failOnError: false,
        quiet: true,
      }),
    ]
  }
};

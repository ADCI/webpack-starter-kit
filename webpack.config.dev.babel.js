import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import postcssNext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import postcssExtend from 'postcss-extend';
import postcssReporter from 'postcss-reporter';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const extractStyles = new ExtractTextPlugin({ filename: 'css/[name].css' });

const postcssProcessors = [
  postcssImport,
  postcssExtend,
  postcssNext,
  postcssReporter({ clearReportedMessages: true }),
];

const scssProcessors = [
  postcssReporter({ clearReportedMessages: true }),
];

module.exports = env => {
  const stylesType = process.env.STYLES; // postcss or scss
  const stylesExtension = stylesType === 'scss' ? '.scss' : '.css';

  return {
    context: path.resolve(__dirname, 'src'),

    entry: {
      main: './app.js'
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js'
    },

    watch: env.dev,

    devtool: 'cheap-module-eval-source-map',

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
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: postcssProcessors,
                }
              }
            ],
            publicPath: '../'
          })
        },
        {
          test: /\.scss$/,
          use: extractStyles.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: scssProcessors
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ],
            publicPath: '../'
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
                name: 'assets/[name].[ext]'
              }
            },
          ]
        },
        {
          test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]'
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
        context: 'src/' + stylesType,
        files: '**/*' + stylesExtension,
        failOnError: false,
        quiet: true,
      }),

      new BrowserSyncPlugin({
        files: "dist/**/*.*",
        hostname: "localhost",
        port: 8080,
        server: { baseDir: ['dist'] },
        reloadDelay: 50,
        injectChanges: false,
        reloadDebounce: 500,
        reloadOnRestart: true
      }),
    ],
  }
};

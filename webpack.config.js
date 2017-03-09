const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sourcePath = path.join(__dirname, './app');
const staticsPath = path.join(__dirname, './static');

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const plugins = [
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    }),
    new webpack.NamedModulesPlugin(),*/
    new ExtractTextPlugin({ filename: 'styles.css', disable: false, allChunks: true }),
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
          warnings: false,
          drop_console: true,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
      js: './main.js'
    },
    output: {
      path: staticsPath,
      filename: '[name].bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(htm|html|xhtml|hbs|handlebars|php)$/,
          include: path.resolve(__dirname, "."),
          exclude: [
            path.join(__dirname, './static'),
            path.join(__dirname, './node_modules')
          ],
          enforce: "pre",
          use: [{
            loader: "htmllint-loader",
            options: {
              failOnError: true,
              failOnWarning: false
            }
          }],
        },
        {
          test: /\.(htm|html|xhtml|hbs|handlebars|php)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },{
            loader: 'html-loader',
            options: {
              minimize: isProd
            }
          }],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
              loader: 'css-loader',
              options: {
                minimize: isProd
              }
            },'postcss-loader']
          })
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              ["es2015", { "modules": false }]
            ]
          },
        },
      ],
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.json', '.css'],
      modules: [
        "node_modules",
        sourcePath
      ]
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 200000,
      maxEntrypointSize: 400000,
      hints: 'warning',
    },

    stats: {
      colors: {
        green: '\u001b[32m',
      }
    },

    devServer: {
      contentBase: path.resolve(__dirname, '.'),
      historyApiFallback: true,
      https: true,
      noInfo: true,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      },
    }
  };
};
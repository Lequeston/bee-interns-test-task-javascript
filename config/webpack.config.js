const path = require('path');
const webpack = require('webpack');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config()

const ROOT_PATH = path.resolve(__dirname, '..');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isBuild = process.env.MODE_ENV === 'build'
const isProduction = !isDevelopment;
const bundlePath = process.env.BUNDLE_PATH || 'dist';
const homePage = process.env.HOME_PAGE || '/';

const filename = extension => isProduction ? `[name].[hash].${extension}` : `[name].${extension}`;

module.exports = {
  context: path.resolve(ROOT_PATH, 'src'),

  mode: isDevelopment ? 'development' : 'production',

  entry: {
    client: ['babel-polyfill', './index.tsx']
  },

  output: {
    path: path.resolve(ROOT_PATH, bundlePath),
    filename: filename('js')
  },

  devServer: {
    port: 3000,
    hot: true
  },

  resolve: {
    extensions: [
      '.js', '.ts', '.tsx', '.jsx'
    ],
    alias: {
      '@': path.resolve(ROOT_PATH, 'src'),
      '@components': path.resolve(ROOT_PATH, 'src', 'components'),
      '@assets': path.resolve(ROOT_PATH, 'src', 'assets'),
      '@config': path.resolve(ROOT_PATH, 'src', 'config')
    }
  },

  devtool: isDevelopment ? 'source-map' : undefined,

  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isProduction && new MiniCSSExtractPlugin({
      filename: filename('css')
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      publicPath: isBuild ? homePage : '/',
      chunks: ['client']
    }),
    new Dotenv()
  ].filter(Boolean),

  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
	      }
      }),
      new CssMinimizerPlugin()
    ]
  },

  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCSSExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|otf|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'media',
              name: filename('ext'),
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              isDevelopment && 'react-refresh/babel'
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}

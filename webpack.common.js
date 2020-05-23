const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const devMode = process.env.NODE_ENV !== 'production';
// HtmlWebpackPlugin配置
const getHtmlConfig = function iife(name) {
  return {
    template: `./src/view/${name}.html`,
    filename: `${name}.html`,
    inject: true,
    hash: true,
    chunks: ['common', name],
    favicon: './src/images/favicon.ico',
  };
};


module.exports = {
  entry: {
    common: './src/pages/common/index.js',
    index: './src/pages/index/index.js',
    work: './src/pages/work/index.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      exclude: /node_modules/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        },
        // 将解析出来的css插入js内部
        // 'style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader',
      ],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'images/[name].[ext]',
        },
      }, ],
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      exclude: /node-modules/,
      use: [
        'file-loader',
      ],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching',
    }),
    new ManifestPlugin(),
    // css单独打包
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    // html模版处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('work')),
  ],
};
/**
 * development config
 */

var webpack = require('webpack'),
    path = require('path');

var EXCLUDE_PATH = /node_modules/,
    OUTPUT_PATH = path.join(__dirname, 'dist'),
    PUBLIC_PATH = 'http://localhost:4400/dist/'

var config = {
  //经测试，该配置对build和rebuild有影响
  devtool: 'cheap-source-map',    //模块资源调试地图 ，同时css或less的loader要加上参数?sourceMap，js的loader不用加

  entry: {    //编译的入口文件
    main: ['webpack-hot-middleware/client', './src/main']
  },

  output: {   //输出配置
    path: OUTPUT_PATH,
    filename: '[name].js',
    //chunkFilename: 'chunks/[name][hash:8].chunk.js', //按需加载配置
    publicPath: PUBLIC_PATH
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?cacheDirectory=true',  //使用babel.cacheDirectory进行缓存编译，没有测试，不知道对build和rebuild有何影响
        include: path.join(__dirname, 'src'),
        exclude: EXCLUDE_PATH //不包括此文件夹内的文件
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap=true&modules&localIdentName=[name]__[local]-[hash:base64:5]',
        exclude: [EXCLUDE_PATH, path.join(__dirname, './src/styles')]
      },
      {
        test: /\.css$/,
        loader: 'style!css?sourceMap=true',
        include: path.join(__dirname, './src/styles')
      },
      {
        test: /\.less$/,
        loader: 'style!css?sourceMap=true!less?{"sourceMap":true}',
        include: path.join(__dirname, '/node_modules/antd')
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js')
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css', '.less'], // resolve 指定可以被 import 的文件后缀
    alias: {

    } //指定包路径，这样能够减少webpack搜索硬盘文件的时间
  }

}

module.exports = config;
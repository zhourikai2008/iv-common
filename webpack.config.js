const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//打包css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //清理dist下旧版本

// const htmlWebpackPlugin = new HtmlWebpackPlugin({
//     template: path.join(__dirname, './example/src/index.html'),
//     filename: './index.html'
// });

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  externals: {
    React: 'react'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',  //官网tip: 该插件不能和style 一起用
          'cache-loader',
          'css-loader', 'less-loader'
        ],
      },
    ]
  },
  plugins: [
    // htmlWebpackPlugin,
    new MiniCssExtractPlugin({
      // filename:'[name]_[contenthash:8].css'
      filename:'[name].css',
      chunkFilename:'[id].css',
    }),
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin()
  ],
  devServer: {
    port: 3001
  }
};

const path = require('path');
const webpack = require('webpack');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    dll: [
      'axios',
      'lodash',
      'react',
      'react-dom',
      'react-router-dom',
      'moment',
    ]
  },
  output: {
    path: path.resolve(__dirname, './public/dll'), //放在项目的dll目录下面
    filename: '[name].[hash].js', //打包文件的名字
    library: '[name]_[hash]' //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          warnings: false,
          comment: false
        }
      })
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './public/dll', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_[hash]'
    })
  ]
};

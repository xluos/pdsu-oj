const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = (context) => {
  const { webpack } = context;
  return {
    devServer: {
      historyApiFallback: true  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          alifdNext: {
            name: "chunk-alifd-next",
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 vendors
            test: /[\\/]@alifd[\\/]next[\\/]/,
            reuseExistingChunk: true
          },
          antd_rc: {
            name: "chunk-antd-rc",
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 vendors
            test: /[\\/](antd)|(rc-.*)|(lodash)|(api)[\\/]/,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "../buildReport.html"
      }),
      // 处理dll引用，避免重复打包
      new webpack.DllReferencePlugin({
        manifest: 'public/dll/dll-manifest.json'
      }),
      // 将dll复制到dist/js目录下
      new CopyWebpackPlugin([{
        from: 'public/dll/dll.*.js', to: 'js/', flatten: true
      }]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
        inject: true
      }),
      // 将dll插入到HtmlWebpackPlugin输出的页面
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [{ path: '/js', glob: '*.js', globPath: path.resolve(__dirname, './public/dll') }],
        publicPath: '/',
        append: false,
        hash: true
      }),
    ]
  };
}

module.exports = (context) => {
  const { webpack } = context;
  return {
    devServer: {
      historyApiFallback: true  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    },
    // module: {
    //   rules: [{
    //     test: /\.js$/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: 'es2015',
    //         plugins: ['syntax-dynamic-import']
    //       }
    //     }
    //   }]
    // }
  };
}

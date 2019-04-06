module.exports = {
  devServer: {
    historyApiFallback: true  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  }
};

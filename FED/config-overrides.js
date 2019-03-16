const { injectBabelPlugin } = require('react-app-rewired');
const WebpackPluginImport = require('webpack-plugin-import');
const rewireSass = require('./rewire-scss');

module.exports = function override(config) {
  config = injectBabelPlugin(
    ['import', [
      { libraryName: '@alifd/next', style: true }, 
      { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }
    ]],
    config
  );
  config = injectBabelPlugin(
    ['syntax-dynamic-import'],
    config
  );
  config.plugins.push(
    new WebpackPluginImport([
      {
        libraryName: /^@alifd\/next\/lib\/([^/]+)/,
        stylePath: 'style.js',
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: 'style.js',
      },
    ])
  );
  config = rewireSass(config);
  // // 设置无效，先注释掉
  // config.devServer = {
  //   disableHostCheck: true,
  //   host: "0.0.0.0",
  //   hot: true
  // }
  return config;
};

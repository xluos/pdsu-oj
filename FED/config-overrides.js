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

  return config;
};

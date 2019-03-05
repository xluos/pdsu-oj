export = (appInfo: any) => {
  const config: any = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551762123758_2901';

  // add your config here
  config.middleware = [
  ];

  // watch default file state
  config.development = {
    watchDirs: [
      'app',
      'lib',
      'config',
      'app.ts',
      'agent.ts',
      'interface.ts',
    ],
    overrideDefault: true,
  };

  return config;
};

export = (appInfo: any) => {
  const config: any = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552400014075_6290';

  // add your config here
  config.middleware = [
  ];

  config.jwt = {
    secret: '159789'
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }

  return config;
};

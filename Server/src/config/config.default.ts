export = (appInfo: any) => {
  const config: any = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552400014075_6290';

  // add your config here
  config.middleware = [
    'cors',
    'options',
    'error',
  ];

  config.jwt = {
    secret: '159789'
  };
  config.cors = {
    credentials: true
  }
  config.security = {
    csrf: {
      enable: false,
    },
  }

  return config;
};

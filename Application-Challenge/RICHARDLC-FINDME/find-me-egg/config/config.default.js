/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1659967462633_9667';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  userConfig.mysql = {
    client: {
      host: '114:132.227.188',
      port: '3306',
      user: 'root',
      password: 'a123456',
      database: 'findme',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

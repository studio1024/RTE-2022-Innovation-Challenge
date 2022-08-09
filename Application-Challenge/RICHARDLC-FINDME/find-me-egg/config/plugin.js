'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 启用egg-cors插件 /config/plugin.js
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc'
  }
  // sequelize = {
  //   enable: true,
  //   package: 'egg-sequelize',
  // }

  // 参数配置 config / config.default.js
  // config.security = {
  //     // 关闭 csrf
  //     csrf: {
  //         enable: false,
  //     },
  //     // 跨域白名单
  //     domainWhiteList: [ 'http://localhost:3000' ],
  // };

  // 允许跨域的方法
  // config.cors = {
  //     origin: '*',
  //     allowMethods: 'GET, PUT, POST, DELETE, PATCH'
  // };
};

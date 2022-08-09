// /* eslint valid-jsdoc: "off" */

// 'use strict';

// /**
//  * @param {Egg.EggAppInfo} appInfo app info
//  */
// module.exports = appInfo => {
//   /**
//    * built-in config
//    * @type {Egg.EggAppConfig}
//    **/
//   const config = exports = {};

//   // use for cookie sign key, should change to your own and keep security
//   config.keys = appInfo.name + '_1607324126533_6821'

//   // add your middleware config here
//   config.middleware = ['errorHandler'];
//   // 参数配置 config / config.default.js
//   config.security = {
//     // 关闭 csrf
//     csrf: {
//       enable: false,
//     },
//     // 跨域白名单
//     domainWhiteList: ['http://localhost:3000'],
//   };
//   config.multipart = {
//     fields: 50, // 表单上传字段限制的个数
//     fileSize: '50mb' // 文件上传的大小限制
// }
//   // 允许跨域的方法
//   config.cors = {
//     origin: '*',
//     allowMethods: 'GET, PUT, POST, DELETE, PATCH'
//   };

//   config.cluster = {
//     listen: {
//         port: 7002,
//         hostname: '127.0.0.1'
//     }
// }

//   config.sequelize = {
//     dialect: 'mysql',
//     // host: '127.0.0.1',
//     host: '114.132.227.188',
//     username: 'root',
//     password: 'a123456',
//     port: 3306,
//     database: 'time_walker',
//     // database: 'time-walk-db',
//     // 中国时区
//     timezone: '+08:00',
//     define: {
//       // 取消数据表名复数
//       freezeTableName: true,
//       // 自动写入时间戳 created_at updated_at
//       timestamps: true,
//       // 字段生成软删除时间戳 deleted_at
//       // paranoid: true,
//       createdAt: 'created_at',
//       updatedAt: 'updated_at',
//       // deletedAt: 'deleted_at',
//       // 所有驼峰命名格式化
//       underscored: true
//     }
//   };

//   // add your user config here
//   const userConfig = {
//     password_salt: 'ntihcbRbx1mnFKKW38ZI7hoBMKbe35Me'
//     // myAppName: 'egg',
//   };

//   return {
//     ...config,
//     ...userConfig,
//   };
// };
/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1607324126533_6821'

  // add your middleware config here
  config.middleware = ['errorHandler']

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    password_salt: 'ntihcbRbx1mnFKKW38ZI7hoBMKbe35Me',
  }

  config.multipart = {
    fields: 50, // 表单上传字段限制的个数
    fileSize: '50mb', // 文件上传的大小限制
  }
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
    },
  }

  config.sequelize = {
    dialect: 'mysql',
    // host: '127.0.0.1',
    host: '114.132.227.188',
    username: 'root',
    password: 'a123456',
    port: 3306,
    database: 'time_walker',
    // database: 'time-walk-db',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: true,
    },
  }

  config.validate = {
    // convert: false,
    // validateRoot: false,
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  config.jwt = {
    secret: '123edasfvbyj6SDG$t35W',
  }

  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.swaggerdoc = {
    // dirScanner: './app/controller',
    // basePath: 'http://47.111.88.161:8080',
    // apiInfo: {
    //   title: 'API',
    //   description: 'swagger-ui for NAPI document.',
    //   version: '1.0.0',
    // },
    // schemes: ['http', 'https'],
    // consumes: ['application/json'],
    // produces: ['application/json'],
    // securityDefinitions: {
    //   // apikey: {
    //   //   type: 'apiKey',
    //   //   name: 'clientkey',
    //   //   in: 'header',
    //   // },
    //   // oauth2: {
    //   //   type: 'oauth2',
    //   //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
    //   //   flow: 'password',
    //   //   scopes: {
    //   //     'write:access_token': 'write access_token',
    //   //     'read:access_token': 'read access_token',
    //   //   },
    //   // },
    // },
    // enableSecurity: false,
    // // enableValidate: true,
    // routerMap: true,
    // enable: true,
  }

  return {
    ...config,
    ...userConfig,
  }
}

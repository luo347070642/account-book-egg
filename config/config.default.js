/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1628216431593_898'

  // add your middleware config here
  config.middleware = []

  config.security = {
    csrf: { enable: false, ignoreJSON: true },
    domainWhiteList: ['*']
  }

  config.view = {
    mapping: { '.html': 'ejs' } // 左边写成.html后缀，会自动渲染.html文件
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'luopengyuan.cn',
      // 端口号
      port: '3306',
      // 用户名
      user: 'test',
      // 密码
      password: 'test123456', // 初始化密码，没设置的可以不写
      // 数据库名
      database: 'test' // 我们新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }
  config.jwt = {
    secret: 'Nick'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig
  }
}

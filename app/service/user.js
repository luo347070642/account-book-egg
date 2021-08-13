'use strict'

const Service = require('egg').Service

class userService extends Service {
  async getUserByName(username) {
    const { app } = this
    try {
      const result = await app.mysql.get('user', { username })
      return result
    } catch (error) {
      console.log(error)
      app.logger.error(`查询失败${error}`)
      return null
    }
  }
  async register(userInfo) {
    const { app } = this
    try {
      const result = await app.mysql.insert('user', userInfo)
      return result
    } catch (error) {
      console.log(error)
      app.logger.error(`注册失败${error}`)
      return null
    }
  }
}

module.exports = userService

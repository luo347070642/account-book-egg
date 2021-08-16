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
  // 修改用户信息
  async editUserInfo(params) {
    const { ctx, app } = this
    try {
      // 通过 app.mysql.update 方法，指定 user 表，
      const result = await app.mysql.update(
        'user',
        {
          ...params
        },
        {
          id: params.id // 筛选出 id 等于 params.id 的用户
        }
      )
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

module.exports = userService

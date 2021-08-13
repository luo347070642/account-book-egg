'use strict'

const Service = require('egg').Service

class HomeService extends Service {
  async user() {
    // 假设从数据库获取的用户信息
    const { app } = this
    const query_clounm = 'id,title'
    const sql = `select ${query_clounm} from test`
    try {
      const result = await app.mysql.query(sql)
      return result
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async addUser(title) {
    const { app } = this
    try {
      const result = await app.mysql.insert('test', { title })
      return result
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async updateUser(id, title) {
    const { app } = this
    try {
      const result = await app.mysql.update(
        'test',
        { title },
        { where: { id } }
      )
      return result
    } catch (error) {
      return null
    }
  }
  async deleteUser(id) {
    const { app } = this
    try {
      const result = await app.mysql.delete('test', { id })
      return result
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
module.exports = HomeService

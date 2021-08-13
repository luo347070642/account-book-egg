'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    // const { id } = ctx.query

    // ctx.body = `hi, egg ${id}`
    await ctx.render('index.html', {
      title: '123213'
    })
  }
  async user() {
    const { ctx } = this
    const result = await ctx.service.home.user()
    ctx.body = result
  }
  async addUser() {
    const { ctx } = this
    const { title } = ctx.request.body
    try {
      await ctx.service.home.addUser(title)
      ctx.body = {
        code: 200,
        msg: '添加成功'
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '添加失败'
      }
    }
  }
  async editUser() {
    const { ctx } = this
    const { id, title } = ctx.request.body
    try {
      await ctx.service.home.updateUser(id, title)
      ctx.body = {
        code: 200,
        msg: '修改成功'
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '修改失败'
      }
    }
  }
  async removeUser() {
    const { ctx } = this
    const { id } = ctx.request.body
    try {
      await ctx.service.home.deleteUser(id)
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '删除成功'
      }
    }
  }
  async add() {
    const { ctx } = this
    const { title } = ctx.request.body
    ctx.body = {
      title
    }
  }
}

module.exports = HomeController

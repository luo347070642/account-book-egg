'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    console.log(`参数：${JSON.stringify(ctx.request.body)}`)
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null
      }
      return
    }

    // 验证数据库内是否已经有该账户名
    const userInfo = await ctx.service.user.getUserByName(username)
    // 判断是否已经存在
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
        data: null
      }
      return
    }
    // 默认头像，放在 user.js 的最外，部避免重复声明。
    const defaultAvatar =
      'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'
    // 调用 service 方法，将数据存入数据库。
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '世界和平。',
      avatar: defaultAvatar
    })

    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }
  async login() {
    const { ctx, app } = this
    const { username, password } = ctx.request.body
    // 根据用户名，在数据库查找相对应的id操作
    const userInfo = await ctx.service.user.getUserByName(username)
    // 没找到说明没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null
      }
      return
    }
    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null
      }
      return
    }
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
      },
      app.config.jwt.secret
    )
    ctx.body = {
      code: 200,
      message: '登录成功',
      data: {
        token
      }
    }
  }
}

module.exports = UserController

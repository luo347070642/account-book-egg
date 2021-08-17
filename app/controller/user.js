'use strict'

const Controller = require('egg').Controller

const defaultAvatar =
  'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

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
  async getUserInfo() {
    const { ctx, app } = this
    const token = ctx.request.header.authorization
    const decode = app.jwt.verify(token, app.config.jwt.secret)
    const userInfo = await ctx.service.user.getUserByName(decode.username)
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar
      }
    }
  }
  // 修改用户信息
  async editUserInfo() {
    const { ctx, app } = this
    // 通过 post 请求，在请求体中获取签名字段 signature
    const { signature = '', avatar = '' } = ctx.request.body

    try {
      const token = ctx.request.header.authorization
      // 解密 token 中的用户名称
      const decode = await app.jwt.verify(token, app.config.jwt.secret)
      if (!decode) return
      const user_id = decode.id
      // 通过 username 查找 userInfo 完整信息
      const userInfo = await ctx.service.user.getUserByName(decode.username)
      // 通过 service 方法 editUserInfo 修改 signature 信息。
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar
      })

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: user_id,
          signature,
          username: userInfo.username,
          avatar
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  async test() {
    const { ctx, app } = this
    // const token = ctx.request.header.authorization
    // const decode = await app.jwt.verify(token, app.config.jwt.secret)
    ctx.body = {
      code: 200,
      message: '获取成功',
      data: {
        // ...decode
      }
    }
  }
}

module.exports = UserController

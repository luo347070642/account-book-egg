'use strict'

module.exports = secret => {
  return async function jwtErr(ctx, next) {
    console.log(JSON.stringify(ctx))
    const token = ctx.request.header.authorization
    let decode
    if (token && token !== 'null') {
      try {
        decode = ctx.app.jwt.verify(token, secret)
        await next()
      } catch (error) {
        console.log('error', error)
        ctx.app.logger.error(`token已过期，请重新登录，${error}`)
        ctx.status = 200
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 401
        }
        return
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 401,
        msg: 'token不存在'
      }
      return
    }
  }
}

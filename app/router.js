'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  // router.get('/', controller.home.index)
  // router.get('/user/:id', controller.home.user)
  // router.post('/add', controller.home.add)
  // router.post('/addUser', controller.home.addUser)
  // router.put('/editUser', controller.home.editUser)
  // router.del('/removeUser', controller.home.removeUser)
  const _jwt = middleware.jwtErr(app.config.jwt.secret)
  router.post('/api/user/register', controller.user.register)
  router.post('/api/user/login', controller.user.login)
  router.get('/api/user/getUserInfo', _jwt, controller.user.getUserInfo)
  router.put('/api/user/editUserInfo', _jwt, controller.user.editUserInfo)
  router.post('/api/upload', controller.upload.upload)
  router.get('/api/user/test', _jwt, controller.user.test)
}

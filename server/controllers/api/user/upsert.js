const UserDao = require('daos/user')
module.exports = async ctx => {
  const userDao = new UserDao()

  const userData = await userDao.findAndCountAll()

  ctx.body = {
    code: 0,
    data: userData
  }
}

const UserDao = require('daos/user')
module.exports = async ctx => {
  const userDao = new UserDao()
  const { id, ...rest } = ctx.request.body

  const userData = await userDao.update(rest, {
    where: {
      id
    }
  })

  ctx.body = {
    code: 0,
    data: userData
  }
}

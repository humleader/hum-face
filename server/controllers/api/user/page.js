const UserDao = require('daos/user')
module.exports = async ctx => {
  const userDao = new UserDao()

  const { pageIndex = 1, pageSize = 20, ...rest } = ctx.query

  const userData = await userDao.findAndCountAll({
    where: {
      ...rest
    },
    pageIndex,
    pageSize
  })

  ctx.body = {
    code: 0,
    data: userData
  }
}

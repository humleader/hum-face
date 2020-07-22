const UserDao = require('daos/user')
module.exports = async ctx => {
  const userDao = new UserDao()
  const params = ctx.query

  const resData = await userDao.findOne({
    where: {
      ...params
    }
  })

  ctx.body = {
    code: 0,
    data: resData
  }
}

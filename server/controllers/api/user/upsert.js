const UserDao = require('daos/user')
module.exports = async ctx => {
  const userDao = new UserDao()

  const { id, ...rest } = ctx.request.body

  if (!id) {
    const isExist = await userDao.findOne({
      where: {
        userName: rest.userName
      }
    })
    if (isExist) {
      ctx.body = {
        code: 1,
        error: '用户已存在！'
      }
    } else {
      rest.userPassword = rest.userPassword || 'd7df83a1c841bbc2c2eda47a95acf317'
      const userData = await userDao.create(rest)
      ctx.body = {
        code: 0,
        data: userData
      }
    }
  } else {
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
}

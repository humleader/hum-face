const UserDao = require('daos/user')
module.exports = async ctx => {
  const userDao = new UserDao()

  const { id, ...rest } = ctx.request.body

  let userData
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
      return
    }
    rest.userPassword = rest.userPassword || 'd7df83a1c841bbc2c2eda47a95acf317'
    userData = await userDao.create(rest)
  } else {
    userData = await userDao.update(rest, {
      where: {
        id
      }
    })
  }

  ctx.body = {
    code: 0,
    data: userData
  }
}

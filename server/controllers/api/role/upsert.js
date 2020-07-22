const RoleDao = require('daos/role')
module.exports = async ctx => {
  const roleDao = new RoleDao()

  const { id, ...rest } = ctx.request.body

  if (!id) {
    const isExist = await roleDao.findOne({
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
      rest.addUserId = ctx.session.user.id
      const resData = await roleDao.create(rest)
      ctx.body = {
        code: 0,
        data: resData
      }
    }
  } else {
    rest.updateUserId = ctx.session.user.id
    const resData = await roleDao.update(rest, {
      where: {
        id
      }
    })
    ctx.body = {
      code: 0,
      data: resData
    }
  }
}

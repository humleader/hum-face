const RoleDao = require('daos/role')
module.exports = async ctx => {
  const roleDao = new RoleDao()

  const { id, ...rest } = ctx.request.body

  if (!id) {
    const isExist = await roleDao.findOne({
      where: {
        roleCode: rest.roleCode
      }
    })
    if (isExist) {
      ctx.body = {
        code: 1,
        error: '编码已存在！'
      }
    } else {
      rest.userId = ctx.session.user.id
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

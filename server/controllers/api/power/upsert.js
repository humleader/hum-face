const PowerDao = require('daos/power')
module.exports = async ctx => {
  const powerDao = new PowerDao()

  const { id, ...rest } = ctx.request.body

  if (!id) {
    const isExist = await powerDao.findOne({
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
      const resData = await powerDao.create(rest)
      ctx.body = {
        code: 0,
        data: resData
      }
    }
  } else {
    rest.updateUserId = ctx.session.user.id
    const resData = await powerDao.update(rest, {
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

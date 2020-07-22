const RoleDao = require('daos/role')
module.exports = async ctx => {
  const roleDao = new RoleDao()
  const params = ctx.query

  const resData = await roleDao.findAll({
    where: {
      ...params
    }
  })

  ctx.body = {
    code: 0,
    data: resData
  }
}

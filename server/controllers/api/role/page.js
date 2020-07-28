const RoleDao = require('daos/role')
const { Op } = require('sequelize')

module.exports = async ctx => {
  const roleDao = new RoleDao()

  const { pageIndex = 1, pageSize = 20, ...rest } = ctx.query

  const filter = {}
  const { userName, roleCode } = rest

  if (userName) {
    filter.userName = {
      [Op.like]: `%${userName}%`
    }
  }
  if (roleCode) {
    filter.roleCode = {
      [Op.like]: `%${roleCode}%`
    }
  }

  const resData = await roleDao.findAndCountAll({
    where: {
      ...rest,
      ...filter
    },
    order: [['createTime', 'DESC']],
    pageIndex,
    pageSize
  })

  ctx.body = {
    code: 0,
    data: resData
  }
}

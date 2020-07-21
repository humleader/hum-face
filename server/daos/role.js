const RoleService = require('services/role')
const roleService = new RoleService()
module.exports = class {
  async findAndCountAll(params) {
    const { where, pageIndex = 1, pageSize = 20, ...rest } = params

    const { count, rows } = await roleService.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+pageIndex - 1) * +pageSize,
      ...rest
    })
    return {
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      total: count,
      list: rows || []
    }
  }

  findAll(params) {
    return roleService.findAll(params)
  }

  create(params, options = {}) {
    return roleService.create(params, options)
  }

  findOne(params) {
    return roleService.findOne(params)
  }

  update(params, options = {}) {
    return roleService.update(params, options)
  }

  destroy(params) {
    return roleService.destroy(params)
  }
}

module.exports = class {
  findAndCountAll(params) {
    const { Role } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Role.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Role } = global.M

    return Role.findAll(params)
  }

  create(params, options = {}) {
    const { Role } = global.M

    return Role.create(params, options)
  }

  findOne(params) {
    const { Role } = global.M

    return Role.findOne(params)
  }

  update(params, options = {}) {
    const { Role } = global.M

    return Role.update(params, options)
  }

  // 删除参数包含事务参数
  destroy(params) {
    const { Role } = global.M

    return Role.destroy(params)
  }
}

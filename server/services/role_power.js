module.exports = class {
  findAndCountAll(params) {
    const { RolePower } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return RolePower.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { RolePower } = global.M

    return RolePower.findAll(params)
  }

  create(params, options = {}) {
    const { RolePower } = global.M

    return RolePower.create(params, options)
  }

  findOne(params) {
    const { RolePower } = global.M

    return RolePower.findOne(params)
  }

  update(params, options = {}) {
    const { RolePower } = global.M

    return RolePower.update(params, options)
  }

  // 删除参数包含事务参数
  destroy(params) {
    const { RolePower } = global.M

    return RolePower.destroy(params)
  }
}

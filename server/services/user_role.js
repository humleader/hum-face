module.exports = class {
  findAndCountAll(params) {
    const { UserRole } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return UserRole.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { UserRole } = global.M

    return UserRole.findAll(params)
  }

  // 批量创建
  bulkCreate(params, options = {}) {
    const { UserRole } = global.M
    return UserRole.bulkCreate(params, options)
  }

  create(params, options = {}) {
    const { UserRole } = global.M

    return UserRole.create(params, options)
  }

  findOne(params) {
    const { UserRole } = global.M

    return UserRole.findOne(params)
  }

  update(params, options = {}) {
    const { UserRole } = global.M

    return UserRole.update(params, options)
  }

  // 删除参数包含事务参数
  destroy(params) {
    const { UserRole } = global.M

    return UserRole.destroy(params)
  }
}

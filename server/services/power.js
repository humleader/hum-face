module.exports = class {
  findAndCountAll(params) {
    const { Power } = global.M

    const { where, curPage = 1, pageSize = 20, ...rest } = params

    return Power.findAndCountAll({
      where,
      limit: +pageSize,
      offset: (+curPage - 1) * +pageSize,
      ...rest
    })
  }

  findAll(params) {
    const { Power } = global.M

    return Power.findAll(params)
  }

  create(params, options = {}) {
    const { Power } = global.M

    return Power.create(params, options)
  }

  findOne(params) {
    const { Power } = global.M

    return Power.findOne(params)
  }

  update(params, options = {}) {
    const { Power } = global.M

    return Power.update(params, options)
  }

  // 删除参数包含事务参数
  destroy(params) {
    const { Power } = global.M

    return Power.destroy(params)
  }
}

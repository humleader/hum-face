const PowerService = require('services/power')
const powerService = new PowerService()
module.exports = class {
  async findAndCountAll(params) {
    const { where, pageIndex = 1, pageSize = 20, ...rest } = params

    const { count, rows } = await powerService.findAndCountAll({
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
    return powerService.findAll(params)
  }

  create(params, options = {}) {
    return powerService.create(params, options)
  }

  findOne(params) {
    return powerService.findOne(params)
  }

  update(params, options = {}) {
    return powerService.update(params, options)
  }

  destroy(params) {
    return powerService.destroy(params)
  }
}

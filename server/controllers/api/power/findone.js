const PowerDao = require('daos/power')
module.exports = async ctx => {
  const powerDao = new PowerDao()
  const params = ctx.query

  const resData = await powerDao.findOne({
    where: {
      ...params
    }
  })

  ctx.body = {
    code: 0,
    data: resData
  }
}

const PowerDao = require('daos/power')
module.exports = async ctx => {
  const powerDao = new PowerDao()

  const treeData = await powerDao.findAll()

  function transformTree(list, options = {}) {
    const { keyField = 'id', childField = 'children', parentField = 'parentId' } = options

    const tree = []
    const record = {}

    for (let i = 0, len = list.length; i < len; i++) {
      const item = list[i].dataValues
      const id = item[keyField]

      if (!id) {
        continue
      }

      if (record[id]) {
        item[childField] = record[id]
      } else {
        item[childField] = record[id] = []
      }

      if (item[parentField]) {
        const parentId = item[parentField]

        if (!record[parentId]) {
          record[parentId] = []
        }

        record[parentId].push(item)
      } else {
        tree.push(item)
      }
    }

    return tree
  }

  const tree = transformTree(treeData)

  ctx.body = {
    code: 0,
    data: tree
  }
}

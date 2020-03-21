module.exports = function(req, res) {
  const id = req.params.id

  return {
    code: id % 2,
    error: `${id}无法删除！`
  }
}

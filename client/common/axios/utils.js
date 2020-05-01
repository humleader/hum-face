// 对比字符串
function compareStrings(a, b, ignoreCase) {
  a = String(a)
  b = String(b)

  return ignoreCase ? a.toLocaleLowerCase() === b.toLocaleLowerCase() : a === b
}

// 获取头字段 大小写不敏感
function getHeader(header, field) {
  if (!header) {
    return ''
  }

  const name = Object.keys(header).find(f => compareStrings(f, field, true))
  return header[name] || ''
}

// 抛出 http 异常
function rejectHttpError(message, code) {
  const error = new Error(message)
  error.name = 'HttpError'
  if (code != null) {
    error.code = code
  }

  return Promise.reject(error)
}

export { getHeader, rejectHttpError }

module.exports = function removePrefix(path, prefix) {
  let pathname = path
  if (prefix && prefix !== '/') {
    pathname = path.replace(new RegExp(`^${prefix}`), '')
  }
  return pathname
}

// 从 disposition 中获取 filename
export default function getFileNameFromDisposition(disposition) {
  let filename

  if (disposition && disposition.includes('attachment')) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    var matches = filenameRegex.exec(disposition)
    if (matches && matches[1]) {
      filename = matches[1].replace(/['"]/g, '')
    }
  }

  return decodeURIComponent(filename)
}

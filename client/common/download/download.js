// 下载文件
export default function download(url, fileName) {
  const link = document.createElement('a')
  link.download = fileName || ''
  link.style.display = 'none'
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

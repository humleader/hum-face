import qs from 'qs'
import { baseURI, apiPrefix } from 'common/config'

// 下载专用
export default function(url, params) {
  let downloadUrl = baseURI + apiPrefix + url

  if (params) {
    downloadUrl = downloadUrl + (downloadUrl.includes('?') ? '&' : '?') + qs.stringify(params)
  }

  return fetchPromise(downloadUrl, {
    headers: {
      'x-requested-with': 'XMLHttpRequest'
    },
    credentials: 'same-origin'
  }).then(response => {
    if (response.ok) {
      return response
    } else {
      return response.json().then(
        result => {
          const message = (result && result.error) || '未知错误'
          throwHttpError('文件下载异常：' + message)
        },
        () => throwHttpError('文件下载异常！')
      )
    }
  })
}

// TODO: 重复代码
function throwHttpError(message, code) {
  const error = new Error(message)
  error.name = 'HttpError'
  error.code = code

  throw error
}

function fetchPromise(path, options) {
  return new Promise(resolve => {
    fetch(path, options).then(resolve)
  })
}

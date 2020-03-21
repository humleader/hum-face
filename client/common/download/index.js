import fetch from './fetch'
import getFileNameFromDisposition from './get-filename-from-disposition'
import download from './download'

export default function(url, params, fileName) {
  if (typeof params === 'string' && typeof fileName === 'undefined') {
    fileName = params
    params = null
  }

  return fetch(url, params).then(response => {
    return response.blob().then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]))
      const disposition = response.headers.get('content-disposition')

      download(url, fileName || getFileNameFromDisposition(disposition))
    })
  })
}

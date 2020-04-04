import axios from 'axios'
import qs from 'qs'

import { baseURI, apiPrefix } from 'common/config'
import paramsUtil from './params'
import { getHeader, rejectHttpError } from './utils'

const instance = axios.create({
  baseURL: baseURI + apiPrefix,
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    // 如果项目约定格式为 form，请修改 'Content-Type' 为: 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json;charset=utf-8'
  },
  paramsSerializer(params) {
    params = paramsUtil.parseParams(params, { skipEmpty: true })

    // koa 使用 querystring.parse 解析
    // 'foo=bar&abc=xyz&abc=123' => { foo: 'bar', abc: ['xyz', '123'] }
    return qs.stringify(params, {
      arrayFormat: 'repeat',
      encoder: function(str) {
        return encodeURIComponent(str)
      }
    })
  },
  transformRequest(data, header) {
    const contentType = getHeader(header, 'content-type')

    // 文件上传
    const isMultiPart = contentType === 'multipart/form-data'
    if (isMultiPart) {
      return data
    }

    data = paramsUtil.parseParams(data)
    if (data == null || typeof data === 'string') {
      return data
    }

    // 是否为表单模式
    const isForm = contentType === 'application/x-www-form-urlencoded'

    return isForm ? qs.stringify(data) : JSON.stringify(data)
  }
})

instance.interceptors.request.use(function(config) {
  return config
})

instance.interceptors.response.use(
  function(response) {
    const result = response.data
    if (!result) {
      return rejectHttpError('请求异常！')
    }

    if (typeof result !== 'object') {
      return rejectHttpError('返回数据格式异常！')
    }
    if (result.code !== 0) {
      return rejectHttpError(result.error || '请求异常！', result.code)
    }

    return result.data
  },
  function(error) {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        location.href = `/login?callbackUrl=${encodeURIComponent(location.href)}`
        return
      }
      const data = error.response.data
      if (data && data.error) {
        return rejectHttpError(data.error, data.code)
      }
      return rejectHttpError('请求异常：' + error.response.statusText)
    }

    if (error.request) {
      return rejectHttpError('请求异常：无返回结果')
    }

    return rejectHttpError(error.message)
  }
)

export default instance

// NOTE: 默认使用 application/json 格式
// 如果期望使用 form 格式
// 1. 如果大多数场景为 form 格式
// 请修改 axios.create 方法中的 'Content-Type': 'application/x-www-form-urlencoded'
// 2. 手工调用 form 格式
// axios.post(url, data, {
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// })
// 3. 封装 form 方法
// instance.postForm = function(url, data, config = {}) {
//   config.headers = config.headers || {}
//   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//   return this.post(url, data, config)
// }

import React from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import Loading from './loading'

export default function lazyloader(getComponent) {
  if (typeof getComponent !== 'function') {
    throw new Error('lazyloader 参数 "getComponent" 类型错误，必须为 function')
  }

  return Loadable({
    loader: () => {
      NProgress.start()
      const component = getComponent()

      // 尝试捕获错误
      Promise.resolve(component).catch(
        // eslint-disable-next-line
        e => console.error(e)
      )

      return component
    },
    render: (loaded, props) => {
      NProgress.done()
      const LoadableComponent = loaded.default || loaded
      return <LoadableComponent {...props} />
    },
    loading: Loading
  })
}

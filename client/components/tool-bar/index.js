import React from 'react'
import cn from 'classnames'

import './index.less'

export default props => {
  const { className, children, ...rest } = props
  return (
    <div className={cn(`hum-tool-bar`, className)} {...rest}>
      {children}
    </div>
  )
}

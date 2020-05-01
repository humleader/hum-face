import React from 'react'
import cn from 'classnames'

import './index.less'

const HumContainer = props => {
  const { className, children } = props
  return <div className={cn(`hum-container`, className)}>{children}</div>
}

export default HumContainer

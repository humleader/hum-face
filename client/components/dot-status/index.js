import React from 'react'
import { Icon } from 'antd'
import './index.less'

export default props => {
  const { color, text, isRunning = false } = props

  return (
    <div className="dot-status">
      {isRunning ? (
        <Icon type="loading" />
      ) : (
        <span className="color-dot" style={{ backgroundColor: color }} />
      )}
      <span>{text}</span>
    </div>
  )
}

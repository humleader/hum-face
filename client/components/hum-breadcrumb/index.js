import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import toTypeof from 'common/utils/toTypeof'

import './index.less'

const HumBreadcrumb = props => {
  const { className, item } = props

  return (
    <div className={cn(`hum-breadcrumb`, className)}>
      <Breadcrumb>
        {toTypeof(item) === 'array' ? (
          item.map((res, idx) => {
            if (res.link) {
              return (
                <Breadcrumb.Item key={idx}>
                  <Link to={res.link}>{res.name}</Link>
                </Breadcrumb.Item>
              )
            } else {
              return <Breadcrumb.Item key={idx}>{res.name}</Breadcrumb.Item>
            }
          })
        ) : (
          <Breadcrumb.Item>{item}</Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  )
}

export default HumBreadcrumb

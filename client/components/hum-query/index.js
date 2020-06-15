import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import cn from 'classnames'

import './index.less'

import SearchForm from './search-form'
import TableList from './table-list'

const HumQuery = props => {
  const { className, xTable, query, xForm, toolBar } = props

  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState({
    pageSize: xTable.pageSize,
    pageIndex: xTable.pageIndex
  })

  const doSearch = params => {
    setLoading(true)
    query(params)
      .then(res => {
        setParams(params)
        setLoading(false)
      })
      .catch(res => {
        message.error(res.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    doSearch(params)
    return () => {}
  }, [])

  return (
    <div className={cn(`hum-query`, className)}>
      <SearchForm {...xForm} params={params} doSearch={doSearch} loading={loading} />
      {toolBar || null}
      <TableList {...xTable} params={params} doSearch={doSearch} loading={loading} />
    </div>
  )
}

export default HumQuery

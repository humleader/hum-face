import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import cn from 'classnames'

import './index.less'

import SearchForm from './search-form'
import TableList from './table-list'

const HumQuery = props => {
  const { className, xTable, query, xForm, toolBar, params, historyParams } = props

  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState(params)

  const doSearch = val => {
    setLoading(true)
    setSearchParams(val)
    query(val)
      .then(res => {
        setLoading(false)
      })
      .catch(res => {
        message.error(res.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!historyParams) {
      doSearch(searchParams)
    } else {
      setSearchParams(historyParams || params)
    }
    return () => {}
  }, [historyParams])

  return (
    <div className={cn(`hum-query`, className)}>
      <SearchForm
        {...xForm}
        searchParams={searchParams}
        params={params}
        doSearch={doSearch}
        loading={loading}
      />
      {toolBar || null}
      <TableList {...xTable} searchParams={searchParams} doSearch={doSearch} loading={loading} />
    </div>
  )
}

export default HumQuery

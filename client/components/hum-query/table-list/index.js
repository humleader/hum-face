import React from 'react'
import { Table } from 'antd'
import cn from 'classnames'

const TableList = props => {
  const {
    className,
    loading,
    dataSource,
    doSearch,
    searchParams,
    columns,
    pagination,
    ...rest
  } = props

  let tempPagination = {
    total: dataSource.total,
    pageSize: searchParams.pageSize,
    current: searchParams.pageIndex,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    onShowSizeChange: (pageIndex, pageSize) =>
      doSearch({ ...searchParams, pageIndex: 1, pageSize }),
    onChange: (pageIndex, pageSize) => doSearch({ ...searchParams, pageIndex, pageSize })
  }

  tempPagination = !pagination
    ? {
        pagination: {
          ...tempPagination,
          ...pagination
        }
      }
    : { pagination: pagination }

  return (
    <Table
      className={cn(`hum-table-list`, className)}
      loading={loading}
      columns={columns}
      dataSource={dataSource.list}
      {...tempPagination}
      {...rest}
    />
  )
}

export default TableList

import React, { useEffect, useState } from 'react'
import { Tree, Input, Button, Icon } from 'antd'

import './index.less'

const { TreeNode } = Tree
const { Search } = Input

const levelMap = ['system', 'menu', 'function']

const SearchTree = props => {
  const { onSelectItem, treeData, action } = props

  const [expandedKeys, setExpandedKeys] = useState([])
  const [gData, setGData] = useState([])
  const [curLevel, setCurLevel] = useState(null)
  const [dataList, setDataList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(false)

  const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = node.id
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  useEffect(() => {
    const temp = treeData || []
    const list = []

    if (temp.length) {
      const generateData = data => {
        for (let i = 0; i < data.length; i++) {
          const node = data[i]
          list.push(node)
          if (node.children) {
            generateData(node.children)
          }
        }
      }
      generateData(temp)
      setGData(temp)
      setDataList(list)
      setExpandedKeys(!expandedKeys.length ? [temp[0].id] : expandedKeys)
    } else {
      setGData(temp)
      setDataList(list)
    }

    return () => {}
  }, [treeData])

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  const onSelect = (selectedKeys, e) => {
    onSelectItem(selectedKeys.length ? e.node.props.item : '')
    setCurLevel(selectedKeys.length ? e.node.props.level : 0)
    setExpandedKeys(selectedKeys)
    setAutoExpandParent(true)
  }
  let timeout
  const onChangeSearch = e => {
    const { value } = e.target
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (!value) {
        setSearchValue('')
        setExpandedKeys([treeData[0].id])
        setAutoExpandParent(false)
        return
      }
      const expandedKeys = dataList
        .map(item => {
          if (item.powerName.indexOf(value) > -1) {
            return getParentKey(item.id, gData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      setExpandedKeys(expandedKeys)
      setSearchValue(value)
      setAutoExpandParent(true)
    }, 100)
  }

  const loop = (data, level) =>
    data.map((item, idx) => {
      const titleColor = item.powerName.indexOf(searchValue)
      const beforeStr = item.powerName.substr(0, titleColor)
      const afterStr = item.powerName.substr(titleColor + searchValue.length)

      const title =
        searchValue && titleColor !== -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.powerName}</span>
        )

      if (item.children && item.children.length) {
        return (
          <TreeNode
            key={item.id}
            item={item}
            level={level}
            title={
              <div className="container-title">
                <div className="title-item">{title}</div>
              </div>
            }
          >
            {loop(item.children, level + 1)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          key={item.id}
          item={item}
          level={level}
          title={
            <div className="container-title">
              <div className="title-item">{title}</div>
            </div>
          }
        />
      )
    })

  return (
    <div className="power-search-tree">
      <div className="left-header">
        <Search className="search-input" placeholder="搜索字段名称" onChange={onChangeSearch} />
        <Button
          className="search-btn"
          disabled={curLevel !== null && curLevel === 2}
          type="primary"
          onClick={e => {
            e.stopPropagation()
            action.showPowerModal({ powerType: levelMap[curLevel !== null ? curLevel + 1 : 0] })
          }}
        >
          <Icon type="plus" />
          添加
        </Button>
      </div>

      <Tree
        onExpand={onExpand}
        showLine
        switcherIcon={<Icon type="caret-down" />}
        className="tree-doc"
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        autoExpandParent={autoExpandParent}
      >
        {loop(gData, 0)}
      </Tree>
    </div>
  )
}

export default SearchTree

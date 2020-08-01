import React, { useEffect, useState } from 'react'
import { Tree, Input, Button, Dropdown, Icon, Modal, message, Menu } from 'antd'
import im from 'immutable'

import './index.less'

const { TreeNode } = Tree
const { Search } = Input
const confirm = Modal.confirm

const SearchTree = props => {
  const { onSelectItem, treeData, action } = props

  const [expandedKeys, setExpandedKeys] = useState([])
  const [gData, setGData] = useState([])
  const [item, setItem] = useState()
  const [editType, setEditType] = useState()
  const [visible, setVisible] = useState(false)
  const [dataList, setDataList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [displayIcon, setDisplayIcon] = useState(null)
  const [autoExpandParent, setAutoExpandParent] = useState(false)

  const actions = {
    refreshTree: () => {
      props.queryTree(documentTypeUuid, true)
    },
    close: () => {
      setVisible(false)
    }
  }
  const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key
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
          node.key = node.uuid
          node.title = node.displayName
          list.push(node)
          if (node.children) {
            generateData(node.children)
          }
        }
      }
      generateData(temp)
      setGData(temp)
      setDataList(list)
      setExpandedKeys(!expandedKeys.length ? [temp[0].key] : expandedKeys)
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
  }
  let timeout
  const onChangeSearch = e => {
    const { value } = e.target
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (!value) {
        setSearchValue('')
        setExpandedKeys([treeData[0].key])
        setAutoExpandParent(false)
        return
      }
      const expandedKeys = dataList
        .map(item => {
          if (
            item.title.indexOf(value) > -1 ||
            item.sourcePath.indexOf(value) > -1 ||
            item.path.indexOf(value) > -1
          ) {
            return getParentKey(item.key, gData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      setExpandedKeys(expandedKeys)
      setSearchValue(value)
      setAutoExpandParent(true)
    }, 100)
  }

  const enterItem = id => {
    setDisplayIcon(id)
  }

  const leaveItem = () => {
    setDisplayIcon(null)
  }

  const opneCatalog = (item, type) => {
    setItem(item)
    setEditType(type)
    setVisible(true)
  }

  const deleteAllConfirm = item => {
    const ref = confirm({
      title: '确定删除此字段吗？',
      content: '温馨提示：该操作会删除该字段下所有字段，删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // await service
        //   .fieldDelete({ uuid: item.uuid })
        //   .then(() => {
        //     message.success('删除成功')
        //     actions.refreshTree()
        //     ref.destroy()
        //   })
        //   .catch(res => {
        //     message.error(res.msg)
        //   })
      },
      onCancel() {
        ref.destroy()
      }
    })
  }

  const deleteConfirm = item => {
    const ref = confirm({
      title: '确定删除此字段吗？',
      content: '温馨提示：字段删除后，无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        // await service
        //   .fieldDelete({ uuid: item.uuid })
        //   .then(() => {
        //     message.success('删除成功')
        //     actions.refreshTree()
        //     ref.destroy()
        //   })
        //   .catch(res => {
        //     message.error(res.msg)
        //   })
      },
      onCancel() {
        ref.destroy()
      }
    })
  }

  const cloneConfig = data => {
    let tempConfig = im.List(data)
    tempConfig = tempConfig.toJS()
    return tempConfig
  }

  const loop = data =>
    data.map((item, idx) => {
      const titleColor = item.title.indexOf(searchValue)
      const sourcePath = item.sourcePath ? item.sourcePath.indexOf(searchValue) : 0
      const path = item.path.indexOf(searchValue)
      const beforeStr = item.title.substr(0, titleColor)
      const afterStr = item.title.substr(titleColor + searchValue.length)

      let title =
        searchValue && titleColor !== -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        )
      if (searchValue && (sourcePath !== -1 || path !== -1)) {
        title = <span style={{ color: '#f50' }}>{item.title}</span>
      }

      if (item.children) {
        return (
          <TreeNode
            key={item.key}
            item={item}
            title={
              <div
                className="container-title"
                onMouseEnter={() => enterItem(item.key)}
                onMouseLeave={leaveItem}
              >
                <div className="title-item">{title}</div>
                <div
                  className="btns"
                  style={{ display: displayIcon === item.key ? 'block' : 'none' }}
                >
                  <Icon
                    className={data.length - 1 === idx ? 'type-disable' : 'type-icon'}
                    onClick={e => {
                      e.stopPropagation()
                      if (data.length - 1 === idx) {
                        return
                      }
                      const tempData = cloneConfig(data)
                      const down = tempData[idx + 1]
                      tempData.splice(idx, 2, down, item)
                      const uuids = tempData.map(res => res.uuid)
                      // service.fieldReorder(uuids).then(() => {
                      //   actions.refreshTree()
                      // })
                    }}
                    type="down"
                  />
                  <Icon
                    className={idx === 0 ? 'type-disable' : 'type-icon'}
                    onClick={e => {
                      e.stopPropagation()
                      if (idx === 0) {
                        return
                      }
                      const tempData = cloneConfig(data)
                      const up = tempData[idx - 1]
                      tempData.splice(idx - 1, 2, item, up)
                      const uuids = tempData.map(res => res.uuid)
                      // service.fieldReorder(uuids).then(() => {
                      //   actions.refreshTree()
                      // })
                    }}
                    type="up"
                  />
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          onClick={e => {
                            e.domEvent.stopPropagation()
                            opneCatalog(item, 'add')
                          }}
                        >
                          添加
                        </Menu.Item>
                        <Menu.Item
                          onClick={e => {
                            e.domEvent.stopPropagation()
                            opneCatalog(item, 'edit')
                          }}
                        >
                          修改
                        </Menu.Item>
                        <Menu.Item
                          onClick={e => {
                            e.domEvent.stopPropagation()
                            deleteAllConfirm(item)
                          }}
                        >
                          删除
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottomRight"
                  >
                    <Icon className="type-icon" type="more" />
                  </Dropdown>
                </div>
              </div>
            }
          >
            {loop(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode
          key={item.key}
          item={item}
          title={
            <div
              className="container-title"
              onMouseEnter={() => enterItem(item.key)}
              onMouseLeave={leaveItem}
            >
              <div className="title-item">{title}</div>
              <div
                className="btns"
                style={{ display: displayIcon === item.key ? 'block' : 'none' }}
              >
                <Icon
                  className={data.length - 1 === idx ? 'type-disable' : 'type-icon'}
                  onClick={e => {
                    e.stopPropagation()
                    if (data.length - 1 === idx) {
                      return
                    }
                    const tempData = cloneConfig(data)
                    const down = tempData[idx + 1]
                    tempData.splice(idx, 2, down, item)
                    const uuids = tempData.map(res => res.uuid)
                    // service.fieldReorder(uuids).then(() => {
                    //   actions.refreshTree()
                    // })
                  }}
                  type="down"
                />
                <Icon
                  className={idx === 0 ? 'type-disable' : 'type-icon'}
                  onClick={e => {
                    e.stopPropagation()
                    if (idx === 0) {
                      return
                    }
                    const tempData = cloneConfig(data)
                    const up = tempData[idx - 1]
                    tempData.splice(idx - 1, 2, item, up)
                    const uuids = tempData.map(res => res.uuid)
                    // service.fieldReorder(uuids).then(() => {
                    //   actions.refreshTree()
                    // })
                  }}
                  type="up"
                />
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        onClick={e => {
                          e.domEvent.stopPropagation()
                          opneCatalog(item, 'add')
                        }}
                      >
                        添加
                      </Menu.Item>
                      <Menu.Item
                        onClick={e => {
                          e.domEvent.stopPropagation()
                          opneCatalog(item, 'edit')
                        }}
                      >
                        修改
                      </Menu.Item>
                      <Menu.Item
                        onClick={e => {
                          e.domEvent.stopPropagation()
                          deleteConfirm(item)
                        }}
                      >
                        删除
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomRight"
                >
                  <Icon className="type-icon" type="more" />
                </Dropdown>
              </div>
            </div>
          }
        />
      )
    })

  return (
    <div className="parameter-search-tree">
      <div className="left-header">
        <Search className="search-input" placeholder="搜索字段名称" onChange={onChangeSearch} />
        <Button
          className="search-btn"
          type="primary"
          onClick={e => {
            e.stopPropagation()
            action.showPowerModal()
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
        {loop(gData)}
      </Tree>
    </div>
  )
}

export default SearchTree

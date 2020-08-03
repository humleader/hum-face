import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import im from 'immutable'
import { Empty } from 'antd'

import './index.less'

import empty from 'assets/images/empty.svg'
import HumContainer from 'components/hum-container'
import HumBreadcrumb from 'components/hum-breadcrumb'
import PowerTree from './power-tree'
import TreeNodeItem from './tree-node-item'
import PowerModal from './power-modal'

const QueryList = props => {
  const { power, action } = props

  const treeSource = power.get('treeSource').toJS()
  const powerModal = power.get('powerModal').toJS()
  const [curItem, setCurItem] = useState('')

  useEffect(() => {
    action.powerTree()
    return () => {}
  }, [])

  return (
    <div className="page-power">
      <HumBreadcrumb item="权限管理" />
      <HumContainer className="power-container">
        <div className="power-tree">
          <PowerTree
            treeData={treeSource}
            action={action}
            onSelectItem={item => {
              let tempConfig = item
              if (tempConfig) {
                tempConfig = im.fromJS(item)
                tempConfig = tempConfig.toJS()
              }
              setCurItem(tempConfig)
            }}
          />
        </div>
        <div className="power-field">
          {curItem ? (
            <TreeNodeItem item={curItem} action={action} />
          ) : (
            <Empty
              image={empty}
              imageStyle={{
                height: 140,
                margin: '20px 0'
              }}
              style={{ position: 'relative', top: '40px' }}
              description={<span> 左侧选择相对应的字段 </span>}
            />
          )}
        </div>
      </HumContainer>
      <PowerModal modal={powerModal} action={action} />
    </div>
  )
}

function mapStateToProps(state) {
  const power = state.power
  return {
    power
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.power
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryList)

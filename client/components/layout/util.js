import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import get from 'lodash/get'

// 渲染菜单和子菜单
export function renderMenu(menu, onSubMenu) {
  return hasChild(menu) ? (
    <Menu.SubMenu onTitleClick={onSubMenu} key={menu.id} title={getMenuItem(menu)}>
      {menu.children.map(renderMenu)}
    </Menu.SubMenu>
  ) : (
    <Menu.Item key={menu.id}>{getMenuItem(menu)}</Menu.Item>
  )
}

function hasChild(menu) {
  const hasChild = menu.children && menu.children.length > 0
  return hasChild
}

// 获取菜单
function getMenuItem(menu) {
  const { icon, name, path, selfIcon } = menu

  const content = (
    <span>
      {icon && <Icon type={icon} />}
      {selfIcon && <i className={`iconfont ${selfIcon}`} />}
      <span>{name}</span>
    </span>
  )

  if (!path || hasChild(menu)) return content

  if (isHref(path)) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href={path} target="_blank">
        {content}
      </a>
    )
  }

  return <Link to={path}>{content}</Link>
}

function isHref(path) {
  return /^https?:\/\//.test(path)
}

// 获取菜单 url，如果不存在 path 获取第一个子节点的 url
export const getChildPath = menu => {
  return menu ? menu.path || getChildPath(get(menu, 'children[0]')) : ''
}

// 深度优先树遍历
const traverseDown = (trees = [], cb) => {
  for (const tree of trees) {
    if (cb(tree) === false) break
    traverseDown(tree.children, cb)
  }
}

// 获取最匹配的菜单
// 匹配方式：
// 1. item.pathname 完全匹配 pathname
export function getActiveMenu(menus, pathname) {
  let menu

  traverseDown(menus, item => {
    // 路径完全匹配
    if (item.pathname === pathname) {
      menu = item
      return false
    }
  })

  return menu
}

// 获取选中的菜单列表
export function getParents(menu) {
  const arr = []
  let m = menu
  while (m) {
    arr.push(m.id)
    m = m.parent
  }
  return arr.reverse()
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

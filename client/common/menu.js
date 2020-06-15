const menus = [
  {
    name: 'Admin',
    icon: 'appstore-o',
    children: [
      {
        name: '系统配置',
        icon: 'setting',
        path: 'setting',
        children: [
          {
            name: '用户管理',
            path: '/setting/user'
          },
          {
            name: '角色管理',
            path: '/setting/role'
          },
          {
            name: '权限管理',
            path: '/setting/power'
          }
        ]
      },
      {
        name: '日志管理',
        selfIcon: 'icon-shujujilu',
        path: 'log',
        children: [
          {
            name: '登录日志',
            path: '/log/login'
          },
          {
            name: '操作日志',
            path: '/log/operation'
          }
        ]
      }
    ]
  }
]

// 格式化菜单 设置 id 和 parent
function formatter(data = [], parent) {
  data.forEach((data, index) => {
    data.parent = parent
    // 设置默认 id
    if (!data.id) {
      data.id = parent ? `${parent.id}_${index}` : index.toString()
    } else {
      data.id = data.id.toString()
    }
    if (data.path) {
      // XXX: 获取 pathname 处理路径中存在 ?、# 的情况
      let pathname = data.path.split('?')[0]
      pathname = pathname.split('#')[0]
      data.pathname = pathname
    }
    formatter(data.children, data)
  })

  return data
}

export default formatter(menus)

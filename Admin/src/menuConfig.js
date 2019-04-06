// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  // {
  //   name: '反馈',
  //   path:  '/adminhttps://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'email',
  // },
  // {
  //   name: '帮助',
  //   path:  '/adminhttps://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'help',
  // },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path:  '/admin/dashboard',
    icon: 'atm',
    children: [
      {
        name: '数据统计',
        path:  '/admin/dashboard/monitor',
      },
    ],
  },
  {
    name: '用户管理',
    path:  '/admin/user',
    icon: 'account',
    children: [
      {
        name: '用户列表',
        path:  '/admin/user/list',
      },
      {
        name: '添加用户',
        path:  '/admin/user/create',
      },
      {
        name: '用户权限',
        path:  '/admin/user/privilege',
      },
      {
        name: '用户组管理',
        path:  '/admin/usergroup/manage',
      },
      {
        name: '权限组管理',
        path:  '/admin/privilege/manage',
      },
    ],
  },
  {
    name: '表格页',
    path:  '/admin/table',
    icon: 'calendar',
    children: [
      {
        name: '基础表格',
        path:  '/admin/table/basic',
      },
      {
        name: '通用表格',
        path:  '/admin/table/general',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };

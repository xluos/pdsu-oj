// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  // {
  //   name: '反馈',
  //   path: 'https://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'email',
  // },
  // {
  //   name: '帮助',
  //   path: 'https://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'help',
  // },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'atm',
    children: [
      {
        name: '数据统计',
        path: '/dashboard/monitor',
      },
    ],
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'account',
    children: [
      {
        name: '用户列表',
        path: '/user/list',
      },
      {
        name: '添加用户',
        path: '/user/create',
      },
      {
        name: '用户权限',
        path: '/user/privilege',
      },
      {
        name: '用户组管理',
        path: '/usergroup/manage',
      },
      {
        name: '权限组管理',
        path: '/privilege/manage',
      },
    ],
  },
  {
    name: '表格页',
    path: '/table',
    icon: 'calendar',
    children: [
      {
        name: '基础表格',
        path: '/table/basic',
      },
      {
        name: '通用表格',
        path: '/table/general',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };

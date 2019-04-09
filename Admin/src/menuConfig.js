import React from 'react';
import FoundationSymbol from '@icedesign/foundation-symbol';
// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: ' 主页',
    path:  '/',
    external: true,
    newWindow: true,
    icon: <FoundationSymbol type='home2' />,
  },
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
    icon: 'customize',
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
    icon: 'fans',
    children: [
      {
        name: '用户列表',
        path:  '/admin/user/list',
      },
      {
        name: '信息管理',
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
    name: '题目管理',
    path:  '/admin/problem',
    icon: 'creative',
    children: [
      {
        name: '题目列表',
        path:  '/admin/problem/list',
      },
      {
        name: '题目编辑',
        path:  '/admin/problem/create',
      },
      {
        name: '测试数据',
        path:  '/admin/problem/testdata',
      },
    ],
  },
  {
    name: '竞赛管理',
    path:  '/admin/contest',
    icon: 'activity',
    children: [
      {
        name: '竞赛列表',
        path:  '/admin/contest/list',
      },
      {
        name: '编辑竞赛',
        path:  '/admin/contest/create',
      },
    ],
  },
  {
    name: '通知管理',
    path:  '/admin/notice',
    icon: 'horn',
    children: [
      {
        name: '通知列表',
        path:  '/admin/notice/list',
      },
      {
        name: '站内信',
        path:  '/admin/notice/message',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };

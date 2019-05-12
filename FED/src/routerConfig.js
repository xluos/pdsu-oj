// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

// import AdminLayout from './layouts/AdminLayout';
import { Component } from './lib/Loadable'


const UserList = Component(() => import(/* webpackChunkName: "UserList" */  './pages/UserList'));
const UserCreate = Component(() => import(/* webpackChunkName: "UserCreate" */  './pages/UserCreate'));
const UserPrivilege = Component(() => import(/* webpackChunkName: "UserPrivilege" */  './pages/UserPrivilege'));
const UserGroupManage = Component(() => import(/* webpackChunkName: "UserGroupManage" */  './pages/UserGroupManage'));
const UserGroupDetails = Component(() => import(/* webpackChunkName: "UserGroupDetails" */  './pages/UserGroupDetails'));
const UserGroupCreate = Component(() => import(/* webpackChunkName: "UserGroupCreate" */  './pages/UserGroupCreate'));
const PrivilegeManage = Component(() => import(/* webpackChunkName: "PrivilegeManage" */  './pages/PrivilegeManage'));
const Dashboard = Component(() => import(/* webpackChunkName: "Dashboard" */  './pages/Dashboard'));
const ContestCreate = Component(() => import(/* webpackChunkName: "ContestCreate" */  './pages/ContestCreate'));
const ContestList = Component(() => import(/* webpackChunkName: "ContestList" */  './pages/ContestList'));
const NoticeList = Component(() => import(/* webpackChunkName: "NoticeList" */  './pages/NoticeList'));
const NoticeMessage = Component(() => import(/* webpackChunkName: "NoticeMessage" */  './pages/NoticeMessage'));
const ProblemList = Component(() => import(/* webpackChunkName: "ProblemList" */  './pages/ProblemList'));
const ProblemTestData = Component(() => import(/* webpackChunkName: "ProblemTestData" */  './pages/ProblemTestData'));
const ProblemCreate = Component(() => import(/* webpackChunkName: "ProblemCreate" */  './pages/ProblemCreate'));

const routerConfig = [
  {
    path: '/admin/dashboard/monitor',
    component: Dashboard,
  },
  {
    path: '/admin/user/list',
    component: UserList,
  },
  {
    path: '/admin/user/create',
    component: UserCreate,
  },
  {
    path: '/admin/user/privilege',
    component: UserPrivilege,
  },
  {
    path: '/admin/usergroup/manage',
    component: UserGroupManage,
  },
  {
    path: '/admin/usergroup/:id',
    component: UserGroupDetails,
  },
  {
    path: '/admin/usergroup/create',
    component: UserGroupCreate,
  },
  {
    path: '/admin/privilege/manage',
    component: PrivilegeManage,
  },
  {
    path: '/admin/contest/create',
    component: ContestCreate,
  },
  {
    path: '/admin/contest/list',
    component: ContestList,
  },
  {
    path: '/admin/notice/list',
    component: NoticeList,
  },
  {
    path: '/admin/notice/message',
    component: NoticeMessage,
  },
  {
    path: '/admin/problem/list',
    component: ProblemList,
  },
  {
    path: '/admin/problem/testdata',
    component: ProblemTestData,
  },
  {
    path: '/admin/problem/create',
    component: ProblemCreate,
  },
];

export default routerConfig;

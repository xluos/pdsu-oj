import UserList from './pages/UserList';
// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserCreate from './pages/UserCreate';
import UserPrivilege from './pages/UserPrivilege';
import UserGroupManage from './pages/UserGroupManage';
import UserGroupCreate from './pages/UserGroupCreate';
import PrivilegeManage from './pages/PrivilegeManage';
import Dashboard from './pages/Dashboard';

const routerConfig = [
  {
    path: '/dashboard/monitor',
    component: Dashboard,
  },
  {
    path: '/user/list',
    component: UserList,
  },
  {
    path: '/user/create',
    component: UserCreate,
  },
  {
    path: '/user/privilege',
    component: UserPrivilege,
  },
  {
    path: '/usergroup/manage',
    component: UserGroupManage,
  },
  {
    path: '/usergroup/create',
    component: UserGroupCreate,
  },
  {
    path: '/privilege/manage',
    component: PrivilegeManage,
  },
];

export default routerConfig;

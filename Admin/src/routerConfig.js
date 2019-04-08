// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserList from './pages/UserList';
import UserCreate from './pages/UserCreate';
import UserPrivilege from './pages/UserPrivilege';
import UserGroupManage from './pages/UserGroupManage';
import UserGroupDetails from './pages/UserGroupDetails';
import UserGroupCreate from './pages/UserGroupCreate';
import PrivilegeManage from './pages/PrivilegeManage';
import Dashboard from './pages/Dashboard';
import ContestCreate from './pages/ContestCreate';
import ContestList from './pages/ContestList';
import NoticeList from './pages/NoticeList';
import NoticeMessage from './pages/NoticeMessage';
import ProblemList from './pages/ProblemList';
import ProblemTestData from './pages/ProblemTestData';
import ProblemCreate from './pages/ProblemCreate';

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

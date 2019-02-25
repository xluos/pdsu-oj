import Home from './pages/Home';
import About from './pages/About';
import Rank from './pages/Rank';
import Qa from './pages/Qa';


// 路由模板
// {
//   name: String,
//   isNav: Boolean,
//   path: String!,
//   component: Comment!,
//   exact: Boolean,
//   children: [Router!]
// }
export default [
  {
    name: 'Home',
    path: '/',
    isNav: true,
    component: Home,
    exact: true
  },
  {
    name: '排行',
    isNav: true,
    path: '/rank',
    component: Rank,
  },
  {
    name: '关于',
    isNav: true,
    path: '/about',
    component: About,
  },
  {
    name: 'Q&A',
    isNav: true,
    path: '/qa',
    component: Qa,
  },
]
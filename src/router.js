import Home from './pages/Home/Home';
import About from './pages/About';
import Rank from './pages/Rank';
import Qa from './pages/Qa';
import Problem from './pages/Problem';
import Competition from './pages/Competition';

/* --- 一个有用的分割线 勿删 --- */

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
    name: 'Problem',
    isNav: true,
    path: '/problem',
    component: Problem,
  },
  {
    name: 'Rank',
    isNav: true,
    path: '/rank',
    component: Rank,
  },
  {
    name: 'Competition',
    isNav: true,
    path: '/competition',
    component: Competition,
  },
  {
    name: 'About',
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
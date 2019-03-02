import Loadable from 'react-loadable';
import Loading from './components/Loading';
const Home = Loadable({
  loader: () => import('./pages/Home/Home'),
  loading: Loading,
  delay: 300,
  timeout: 10000,
});
const About = Loadable({
  loader: () => import('./pages/About'),
  loading: Loading,
  delay: 300,
  timeout: 10000,
});
const Rank = Loadable({
  loader: () => import('./pages/Rank'),
  loading: Loading,
  delay: 300,
  timeout: 10000,
});
const Qa = Loadable({
  loader: () => import('./pages/Qa'),
  loading: Loading,
  delay: 300,
  timeout: 10000,
});
const Problem = Loadable({
  loader: () => import('./pages/Problem'),
  loading: Loading,
  delay: 300,
  timeout: 10000,
});
const Competition = Loadable({
  loader: () => import('./pages/Competition'),
  loading: Loading,
  delay: 300,
  timeout: 10000,
});

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
    children: [
      {
        name: 'Problem',
        path: '/:id',
        component: Problem,
      }
    ]
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
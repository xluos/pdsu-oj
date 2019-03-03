import Loadable from 'react-loadable';
import Loading from './components/Loading';

const Component = (Component) => Loadable({
  loader: Component,
  loading: Loading,
  delay: 300,
  timeout: 10000,
});


const Home = Component(() => import('./pages/Home'));
const About = Component(() => import('./pages/About'));
const Submit = Component(() => import('./pages/Submit'));
const Rank = Component(() => import('./pages/Rank'));
const Qa = Component(() => import('./pages/Qa'));
const Problem = Component(() => import('./pages/Problem'));
const ProblemPage = Component(() => import('./pages/ProblemPage'));
const Competition = Component(() => import('./pages/Competition'));

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
        component: ProblemPage,
      }
    ]
  },
  {
    name: 'Submit',
    isNav: true,
    path: '/submit',
    component: Submit,
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
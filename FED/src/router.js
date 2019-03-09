import Loadable from 'react-loadable';
import Loading from './components/Loading';

const Component = (Component) => Loadable({
  loader: Component,
  loading: Loading,
  delay: 300,
  timeout: 10000,
});

const Block = Component(() => import('./pages/Components'));

const Home = Component(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const About = Component(() => import(/* webpackChunkName: "About" */ './pages/About'));
const Submit = Component(() => import(/* webpackChunkName: "Submit" */'./pages/Submit'));
const Rank = Component(() => import(/* webpackChunkName: "Rank" */ './pages/Rank'));
const FAQ = Component(() => import(/* webpackChunkName: "FAQ" */ './pages/FAQ'));
const Problem = Component(() => import(/* webpackChunkName: "Problem" */ './pages/Problem'));
const ProblemPage = Component(() => import(/* webpackChunkName: "ProblemPage" */ './pages/ProblemPage'));
const Contest = Component(() => import(/* webpackChunkName: "Competition" */ './pages/Contest'));
const NotFound = Component(() => import(/* webpackChunkName: "Error404" */ './pages/Error404'));
const LogIn = Component(() => import(/* webpackChunkName: "Login" */ './pages/LogIn'));
const SignUp = Component(() => import(/* webpackChunkName: "Login" */ './pages/SignUp'));


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
    name: 'Block',
    path: '/block',
    component: Block,
    exact: true
  },
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
    exact: true,
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
    exact: true,
  },
  {
    name: 'Rank',
    isNav: true,
    path: '/rank',
    component: Rank,
    exact: true,
  },
  {
    name: 'Contest',
    isNav: true,
    path: '/contest',
    component: Contest,
    exact: true,
  },
  {
    name: 'About',
    isNav: true,
    path: '/about',
    component: About,
    exact: true,
  },
  {
    name: 'FAQ',
    isNav: true,
    path: '/faq',
    component: FAQ,
    exact: true,
  },
  {
    name: '404',
    path: '',
    component: NotFound,
  },
]

export const RootRoute = [
  {
    name: 'signup',
    path: '/signup',
    component: SignUp,
    exact: true,
  },
  {
    name: 'login',
    path: '/login',
    component: LogIn,
    exact: true,
  },
]
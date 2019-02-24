import Home from './pages/Home'
import List from './pages/List'
import Rank from './pages/Rank'


// 路由模板
// {
//   path: String!,
//   component: Comment!,
//   exact: Boolean,
//   children: [Router!]
// }
export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/list',
    component: List,
  },
  {
    path: '/rank',
    component: Rank,
  },
]
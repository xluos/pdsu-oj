import Loadable from 'react-loadable';
import Loading from '../components/Loading';

export const Component = (Component) => Loadable({
  loader: Component,
  loading: Loading,
  delay: 300,
  timeout: 10000,
});

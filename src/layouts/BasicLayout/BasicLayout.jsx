import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
// import { withRouter } from 'react-router';
import {
  Layout,
  Header,
  Content,
  Footer
} from './components/Layout';
import MainRouters from './MainRoutes';
import Nav from './components/Nav';

const BasicLayout = () => (
  <Router>
    <Layout>
      <Header><Nav/></Header>
      <Content><MainRouters/></Content>
      <Footer>footer</Footer>
    </Layout>
  </Router>
);
export default BasicLayout;
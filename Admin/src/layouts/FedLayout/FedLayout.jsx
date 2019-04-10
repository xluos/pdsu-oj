import React from 'react';
import MainRouters from './MainRoutes';
import Routes from "./Routes";
import {
  Layout,
  Header,
  Content,
  Footer
} from './components/Layout';
import Nav from './components/Nav';

export default class FedLayout extends Routes {
  static displayName = 'FedLayout';

  render () {
    return (
      <Layout>
        <Header><Nav /></Header>
        <Content>
          <MainRouters />
        </Content>
        <Footer>Copyright © 2019 CodeDeer</Footer>
      </Layout>
    );
  }
}

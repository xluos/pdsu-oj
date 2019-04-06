import React from 'react';
import {
  Switch
} from 'react-router-dom'
import Routes from "./Routes";
import {
  Layout,
  Header,
  Content,
  Footer
} from './components/Layout';
import Nav from './components/Nav';
import routerData from '../../router.fed';

export default class MainRoutes extends Routes {
  static displayName = 'MainRoutes';

  render() {
    return (
      <Layout>
        <Header><Nav/></Header>
        <Content>
          <Switch>
            {/* 渲染路由表 */}
            {routerData.map(this.renderNormalRoute)}
          </Switch>
        </Content>
        <Footer>Copyright © 2019 CodeDeer</Footer>
      </Layout>

    );
  }
}

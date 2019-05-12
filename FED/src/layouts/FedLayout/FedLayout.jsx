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
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

export default class FedLayout extends Routes {
  static displayName = 'FedLayout';

  render () {
    return (
      <Layout>
        <Header><Nav /></Header>
        <Content>
          <LocaleProvider locale={zh_CN}>
            <MainRouters />
          </LocaleProvider>
        </Content>
        <Footer>Copyright © 2019 CodeDeer</Footer>
      </Layout>
    );
  }
}

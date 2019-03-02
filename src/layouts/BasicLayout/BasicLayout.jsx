import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  withRouter
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

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

ScrollToTop = withRouter(ScrollToTop)

const BasicLayout = () => (
  <Router>
    <ScrollToTop>
      <Layout>
        <Header><Nav/></Header>
        <Content><MainRouters/></Content>
        <Footer>Copyright © 2019 CodeDeer</Footer>
      </Layout>
    </ScrollToTop>
  </Router>
);
export default BasicLayout;
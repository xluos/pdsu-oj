import { Layout } from 'antd';
import React, { Component } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom'
// import { withRouter } from 'react-router';
import MainRouters from './MainRoutes';
import NormalFooter from './components/NormalFooter';
import Nav from './components/Nav';
const {
  Header, Footer, Content,
} = Layout;

// @withRouter
export default class BasicLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return (
      <Router>
      <Layout>
        <Header><Nav/></Header>
        <Content><MainRouters/></Content>
        <Footer><NormalFooter/></Footer>
      </Layout>
      </Router>
    );
  }
}
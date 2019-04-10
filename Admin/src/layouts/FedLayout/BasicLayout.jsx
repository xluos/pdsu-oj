import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
// import { withRouter } from 'react-router';

import RootRouters from './RootRoutes';
import { verifyLoginStatus } from '../../lib/Utils';

@withRouter
class ScrollToTop extends Component {
  componentDidMount() {
    verifyLoginStatus()
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

const BasicLayout = () => (
  <Router>
    <ScrollToTop>
      <RootRouters/>
    </ScrollToTop>
  </Router>
);
export default BasicLayout;

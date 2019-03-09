import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
// import { withRouter } from 'react-router';

import RootRouters from './RootRoutes';

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
      <RootRouters/>
    </ScrollToTop>
  </Router>
);
export default BasicLayout;
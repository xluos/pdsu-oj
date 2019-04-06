import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// TODO 上线换回BrowserRouter
import {
  BrowserRouter as Router
  // HashRouter as Router
  , withRouter } from 'react-router-dom';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import './icon.js'

import router from './router';
@withRouter
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

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(
  <Router>
    <ScrollToTop>
      {router()}
    </ScrollToTop>
  </Router>,

  ICE_CONTAINER
);

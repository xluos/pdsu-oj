import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom'
export default class Routes extends Component {
  static displayName = 'Routes';
  /**
   * 渲染路由组件
   *
   * @memberof MainRoutes
   */
  renderNormalRoute = (item, index) => {
    // 子路由渲染
    if (item.children && item.children.length) {
      let page = item.component ? [(
        <Route
          key={`route-${index}`}
          path={item.path}
          component={item.component}
          exact
        />
      )] : [];
      return page.concat(item.children.map((citem, index) => (
        <Route
          key={`route-childern-${index}`}
          path={item.path + citem.path}
          component={citem.component}
          exact={citem.exact}
        />
      )))
    } else {
      return item.component ? (
        <Route
          key={`route-${index}`}
          path={item.path}
          component={item.component}
          exact={item.exact}
        />
      ) : null;
    }
  };
}

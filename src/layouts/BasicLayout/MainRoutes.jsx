import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom'
import routerData from '../../router';
import _404 from '../../pages/404';
export default class MainRoutes extends Component {
  static displayName = 'MainRoutes';
  /**
   * 渲染路由组件
   *
   * @memberof MainRoutes
   */
  renderNormalRoute = (item, index) => {
    return item.component ? (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    ) : null;
  };

  /**
   * 子路由设置默认重定向地址
   *
   * @memberof MainRoutes
   */
  // getRedirectData = () => {
  //   const redirectData = [];
  //   const getRedirect = (item) => {
  //     if (item && item.children) {
  //       if (item.children[0] && item.children[0].path) {
  //         redirectData.push({
  //           from: `${item.path}`,
  //           to: `${item.children[0].path}`,
  //         });
  //         item.children.forEach((children) => {
  //           getRedirect(children);
  //         });
  //       }
  //     }
  //   };

  //   asideMenuConfig.forEach(getRedirect);

  //   return redirectData;
  // };
  render() {
    // const redirectData = this.getRedirectData();
    return (
      <Switch>
        {/* 渲染路由表 */}
        {routerData.map(this.renderNormalRoute)}
        {/* TODO 暂时没有子路由 先注释掉为以后打算 */}
        {/* 路由重定向，嵌套路由默认重定向到当前菜单的第一个路由
        {redirectData.map((item, index) => {
          return <Redirect key={index} exact from={item.from} to={item.to} />;
        })} */}

        {/* 未匹配到的路由重定向到 <Guide> 组件，实际情况应该重定向到 404 */}
        <Route component={_404} />
      </Switch>
    );
  }
}
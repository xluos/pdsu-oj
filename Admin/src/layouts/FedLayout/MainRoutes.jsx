import React from 'react';
import {
  Switch
} from 'react-router-dom'
import Routes from "./Routes";
import routerData from '../../router.fed';

export default class MainRoutes extends Routes {
  static displayName = 'MainRoutes';
  render() {
    return (
      <Switch>
        {/* 渲染路由表 */}
        {routerData.map(this.renderNormalRoute)}
      </Switch>
    );
  }
}

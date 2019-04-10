import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom'
import { RootRoute as RootRouteData } from '../../router.fed';
import MainRouters from './MainRoutes';
import Routes from "./Routes";


export default class RootRoutes extends Routes {
  static displayName = 'RootRoutes';

  render() {
    return (
      <Switch>
        {/* 渲染路由表 */}
        {RootRouteData.map(this.renderNormalRoute)}
        <Route component={MainRouters}/>
      </Switch>
    );
  }
}

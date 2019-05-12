import React from 'react';
import {
  Switch
} from 'react-router-dom'
import { RootRoute as RootRouteData } from '../../router.fed';
import Routes from "../FedLayout/Routes";


export default class BasicLayout extends Routes {
  static displayName = 'BasicLayout';

  render() {
    return (
      <Switch>
        {RootRouteData.map(this.renderNormalRoute)}
      </Switch>
    );
  }
}

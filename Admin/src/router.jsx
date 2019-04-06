/**
 * 定义应用路由
 */
import { Switch, Route } from 'react-router-dom';
import React from 'react';

import BasicLayout from './layouts/BasicLayout';
import FedLayout from './layouts/FedLayout';

// 按照 Layout 归类分组可以按照如下方式组织路由
const router = () => {
  return (
    <Switch>
      <Route path="/admin" component={BasicLayout} />
      <Route path="/" component={FedLayout} />
    </Switch>
  );
};

export default router;

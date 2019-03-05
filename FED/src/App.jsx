import React from 'react';
import BasicLayout from './layouts/BasicLayout';
import './icon';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const App = () => (
  <LocaleProvider locale={zh_CN}>
    <BasicLayout />
  </LocaleProvider>
)

export default App;

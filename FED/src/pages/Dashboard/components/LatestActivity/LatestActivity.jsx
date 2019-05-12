import React, { Component } from 'react';
import Card from './Card';
import BarChart from './BarChart';

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      name: `${index + 1}. 路人甲`,
      num: parseInt(Math.random() * 1000),
    };
  });
};

export default class LatestActivity extends Component {
  static displayName = 'LatestActivity';

  static propTypes = {};

  static defaultProps = {};

  render() {
    const dataSource = getData();
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'AC数',
        dataIndex: 'num',
        key: 'num',
      },
    ];

    return (
      <Card
        title="最新刷题统计"
        subTitle="最近7日TOP 10"
        summary={[
          { label: '本周AC数', value: '123' },
          { label: '上周AC数', value: '349' },
          { label: '累计AC数', value: '23,239' },
        ]}
        dataSource={dataSource}
        link={{ text: '明细信息', href: '#' }}
        columns={columns}
        content={<BarChart />}
      />
    );
  }
}

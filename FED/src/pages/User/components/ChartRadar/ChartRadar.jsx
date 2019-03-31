import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';

export default class ChartRadar extends Component {
  static displayName = 'ChartRadar';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      { item: 'DP', a: 70, b: 30 },
      { item: '模拟', a: 60, b: 70 },
      { item: '基础', a: 50, b: 60 },
      { item: '图论', a: 40, b: 50 },
      { item: '树', a: 60, b: 70 }
    ];

    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['a'], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    });

    const cols = {
      score: {
        min: 0,
        max: 80,
      },
    };

    return (
      <div className="chart-radar">
        <Chart
          height={250}
          data={dv}
          padding={[20, 30, 0, 20]}
          scale={cols}
          forceFit
        >
          <Coord type="polar" />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null,
              },
              hideFirstLine: false,
            }}
            label={{
              offset: 5
            }}
          />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: 'polygon',
              lineStyle: {
                lineDash: null,
              },
              alternateColor: 'rgba(0, 0, 0, 0.04)',
            }}
            label={null}
          />
          <Geom type="area" position="item*score" color="user" />
        </Chart>
      </div>
    );
  }
}

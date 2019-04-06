import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import { DataView } from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class ChartPie extends Component {
  static displayName = 'ChartPie';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const data = [
      { item: '事例一', count: 40 },
      { item: '事例二', count: 21 },
      { item: '事例三', count: 17 },
      { item: '事例四', count: 13 },
      { item: '事例五', count: 9 },
    ];

    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });

    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };

    return (
      <div className="chart-pie">
        <h4 style={styles.title}>饼图</h4>
        <Chart
          height={300}
          data={dv}
          scale={cols}
          forceFit
        >
          <Coord type="theta" />
          <Axis name="percent" />
          <Legend position="bottom"/>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = `${percent * 100}%`;
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{ lineWidth: 1, stroke: '#fff' }}
          >
            <Label
              content="percent"
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};

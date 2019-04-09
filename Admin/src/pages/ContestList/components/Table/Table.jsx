import React, { Component } from 'react';
import {
  Table,
  Pagination,
  Button,
  Progress,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import api from '../../../../api/api';
import { withRouter } from 'react-router';

import moment from 'moment';
moment.locale('zh-cn');

// Random Numbers
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      id: random(1, 99999),
      userId: `15136020${random(1, 9)}`,
      name: ['淘小宝', '淘二宝'][random(0, 1)],
      level: random(0, 6),
      balance: random(10000, 100000),
      accumulative: random(50000, 100000),
      regdate: `2018-12-1${random(1, 9)}`,
      birthday: `1992-10-1${random(1, 9)}`,
      store: ['余杭盒马店', '滨江盒马店', '西湖盒马店'][random(0, 2)],
    };
  });
};

@withRouter
@DataBinder({
  contestTable: {
    url: '/contest/list',
    method: 'post',
    data: {
    },
    defaultBindingData: {
      items: []
    }
  }
}, {requestClient: api})
export default class GoodsTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.props.updateBindingData('contestTable', {})
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => {
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };


  handleDetail = (record) => {
    this.props.history.push(`/contest/${record.id}`)
  };
  handleEdit = (record) => {
    this.props.history.push({ pathname: '/admin/contest/create', state: record})
  }
  renderOper = (value, rowIndex, record) => {
    return (
      <Button.Group>
            <Button
              type="secondary"
              onClick={this.handleDetail}
            >
              详情
            </Button>

            <Button
              type="secondary"
              onClick={() => this.handleEdit(record)}
            >
              编辑
            </Button>
      </Button.Group>
    );
  };

  renderBar = (value, rowIndex, record) => {
    const startTime = new Date(record.startTime).getTime()
    const endTime = new Date(record.endTime).getTime()
    const nowTime = new Date().getTime()
    const percent = (nowTime - startTime) / (endTime - startTime) * 100

    let color = '#2eca9c'
    if (percent > 60 && percent < 85) {
      color = '#f1c826'
    }
    if (percent > 85) {
      color = '#ff3000'
    }
    return (
      <Progress percent={percent > 100 ? 100 : percent} color={color}/>
    );
  };

  render() {
    const { current } = this.state;
    const { contestTable } = this.props.bindingData;

    return (
      <div style={styles.container}>
        <IceContainer>
          <FilterTag onChange={this.handleFilterChange} />
          <FilterForm onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={contestTable.__loading} dataSource={contestTable.items} hasBorder={false}>
            <Table.Column title="ID" dataIndex="id" width={250} />
            <Table.Column title="标题" dataIndex="name" />
            <Table.Column title="截止时间" cell={(val) => moment(val).format('MM-DD HH:mm')} dataIndex="endTime" />
            <Table.Column title="进度" cell={this.renderBar} dataIndex="status" />
            <Table.Column
              title="操作"
              width={300}
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            style={styles.pagination}
            current={current}
            onChange={this.handlePaginationChange}
          />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};

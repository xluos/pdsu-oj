import React, { Component } from 'react';
import {
  Table,
  Pagination,
  Button,
  Dialog,
  Rating,
  Switch,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import api from '../../../../api/api';
import { withRouter } from 'react-router';
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
  problemTable: {
    url: '/problem/list',
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
    this.props.updateBindingData('problemTable', {})
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
    this.props.history.push(`/problem/${record.id}`)
  };
  handleEdit = (record) => {
    this.props.history.push({ pathname: '/admin/problem/create', state: record})
  }
  handleTestData = (record) => {
    this.props.history.push({ pathname: '/admin/problem/testdata', state: record})
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
            <Button
              type="secondary"
              onClick={() => this.handleTestData(record)}
            >
              测试数据
            </Button>
      </Button.Group>
    );
  };

  renderIntegral = (value) => {
    return (
      <Rating defaultValue={value} disabled />
    );
  };

  renderStatus = (value, rowIndex, record) => {
    return (
      <div>
        <Switch defaultChecked={ value === 1 } disabled />
      </div>
    );
  };
  render() {
    const { current } = this.state;
    const { problemTable } = this.props.bindingData;

    return (
      <div style={styles.container}>
        <IceContainer>
          <FilterTag onChange={this.handleFilterChange} />
          <FilterForm onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={problemTable.__loading} dataSource={problemTable.items} hasBorder={false}>
            <Table.Column title="ID" dataIndex="id" width={250} />
            <Table.Column title="标题" dataIndex="title" />
            <Table.Column title="难度" cell={this.renderIntegral} dataIndex="integral" />
            <Table.Column title="状态" cell={this.renderStatus} dataIndex="status" />
            <Table.Column title="来源" dataIndex="source" />
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

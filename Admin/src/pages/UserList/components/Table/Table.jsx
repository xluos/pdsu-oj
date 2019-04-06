import React, { Component } from 'react';
import {
  Table,
  Pagination,
  Button,
  Dialog,
  Icon,
  Balloon,
  Tag
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import api from '../../../../api/api';
import { withRouter } from 'react-router';

const Tooltip = Balloon.Tooltip;
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
  usersTable: {
    url: '/user/list',
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
    this.fetchData();
    this.props.updateBindingData('usersTable', {})
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

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };
  handleEdit = (record) => {
    this.props.history.push({ pathname: '/user/create', state: record})
  }
  renderOper = (value, rowIndex, record) => {
    return (
      <Button.Group>
        <Tooltip
          trigger={
            <Button
              type="secondary"
              onClick={this.handleDetail}
            >
              <Icon type="account" />
            </Button>}
          align="t">
          详情
        </Tooltip>
        <Tooltip
          trigger={
            <Button
              type="secondary"
              onClick={() => this.handleEdit(record)}
            >
              <Icon type="edit" />
            </Button>}
          align="t">
          编辑
        </Tooltip>
        <Tooltip
          trigger={
            <Button type="normal" warning onClick={this.handleDelete}>
              <Icon type="ashbin" />
            </Button>
          }
          align="t">
          删除
        </Tooltip>
      </Button.Group>
    );
  };
  LevelTag = (val) => {
    const level = ['青铜', '白银', '黄金', '铂金', '钻石', '最强王者']
    // const color = ['','','','','',''] //TODO 后续支持不同颜色展示
    return (
      <Tag type="normal" size="small" style={{
        color: '#1890FF',
        borderColor: '#1890FF',
        backgroundColor: '#1890FF0F',
        fontSize: '14px'
      }}>{level[val] || '未知'}</Tag>
    )
  }
  render() {
    const { isLoading, data, current } = this.state;
    const { usersTable } = this.props.bindingData;
    return (
      <div style={styles.container}>
        <IceContainer>
          <FilterTag onChange={this.handleFilterChange} />
          <FilterForm onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={usersTable.items} hasBorder={false}>
            <Table.Column title="ID" dataIndex="userId" />
            <Table.Column title="名称" dataIndex="name" />
            <Table.Column title="等级" cell={this.LevelTag} dataIndex="level" />
            <Table.Column title="积分" dataIndex="integral" />
            <Table.Column title="OJ币" dataIndex="coin" />
            <Table.Column title="提交数" dataIndex="submit" />
            <Table.Column title="通过数" dataIndex="solved" />
            <Table.Column title="状态" dataIndex="status" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
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

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
import api from '../../../../api/api';
import { withRouter } from 'react-router';

@withRouter
// @DataBinder({
//   problemTable: {
//     url: '/problem/list',
//     method: 'post',
//     data: {
//     },
//     defaultBindingData: {
//       items: []
//     }
//   }
// }, {requestClient: api})
export default class GoodsTable extends Component {
  state = {
    current: 1,
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    // this.props.updateBindingData('problemTable', {})
  }



  handleEdit = (record) => {
  }
  handleDelTestData = (record) => {
  }
  renderOper = (value, rowIndex, record) => {
    return (
      <Button.Group>
            <Button
              type="secondary"
              onClick={() => this.handleEdit(record)}
            >
              编辑
            </Button>
            <Button
              type="secondary"
              warning
              onClick={() => this.handleDelTestData(record)}
            >
              删除
            </Button>
      </Button.Group>
    );
  };

  render() {
    // const { problemTable } = this.props.bindingData;
    const testDataList = {}
    return (
      <div style={styles.container}>
        <IceContainer>
          <h2 style={styles.formTitle}>测试数据管理</h2>
          <Table loading={testDataList.__loading} dataSource={testDataList.items} hasBorder={false}>
            <Table.Column title="id" dataIndex="id"/>
            <Table.Column title="名称" dataIndex="name"/>
            <Table.Column title="大小" dataIndex="size"/>
            <Table.Column title="操作" cell={this.renderOper}/>
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};

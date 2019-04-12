import React, { Component } from 'react';
import {
  Table,
  Pagination,
  Button,
  Rating,
  Switch,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import Operate from '../Operate';
import api from '../../../../api/api';
import { withRouter } from 'react-router';
import produce from "immer"

@withRouter
@DataBinder({
  problemTable: {
    url: '/problem/list',
    method: 'post',
    data: {
    },
    defaultBindingData: {
      pageNo: 1,
      pageSize: 20,
      pageEnd: 1,
      total: 0,
      items: []
    }
  }
}, {requestClient: api})
export default class GoodsTable extends Component {
  state = {
    value: {
      pageNo: 1,
      pageSize: 20,
      where: {}
    }
  };

  componentDidMount() {
    this.props.updateBindingData('problemTable', { data: this.state.value })
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  handlePaginationChange = async (pageNo) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = pageNo
    }))
    console.log(this.state.value, pageNo);
    this.props.updateBindingData('problemTable', { data: this.state.value })
  };

  handlePageSizeChange = async (pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('problemTable', { data: this.state.value })
  };

  handleFilterTagChange = (tag) => {
  };

  handleFilterTextChange = async (val) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = 1
      state.value.where = {
        text: val
      }
    }))
    this.props.updateBindingData('problemTable', { data: this.state.value })
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
    const { problemTable } = this.props.bindingData;

    return (
      <div style={styles.container}>
        <IceContainer>
          <FilterTag onChange={this.handleFilterTagChange} />
          <FilterForm onChange={this.handleFilterTextChange} />
          <Operate />
        </IceContainer>
        <IceContainer>
          <Pagination
              shape="arrow-only"
              pageSizeList={[10, 20, 35]}
              style={styles.paginationTop}
              total={problemTable.total}
              pageSize={problemTable.pageSize}
              totalRender={total => `总数: ${total}`}
              current={this.state.value.pageNo}
              onChange={this.handlePaginationChange}
              onPageSizeChange={this.handlePageSizeChange}
              pageSizeSelector="filter"
              useFloatLayout
            />
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
            shape="arrow-only"
            pageSizeList={[10, 20, 35]}
            style={styles.paginationBottom}
            total={problemTable.total}
            pageSize={problemTable.pageSize}
            totalRender={total => `总数: ${total}`}
            current={this.state.value.pageNo}
            onChange={this.handlePaginationChange}
            onPageSizeChange={this.handlePageSizeChange}
            pageSizeSelector="filter"
            useFloatLayout
          />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  paginationTop: {
    marginBottom: '20px',
    textAlign: 'right',
  },
  paginationBottom: {
    marginTop: '20px',
    textAlign: 'right',
  },
};

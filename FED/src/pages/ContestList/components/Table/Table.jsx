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
import produce from 'immer';

import moment from 'moment';
moment.locale('zh-cn');

@withRouter
@DataBinder({
  contestTable: {
    url: '/contest/list',
    method: 'post',
    data: {
    },
    defaultBindingData: {
      pageEnd: 1,
      pageNo: 1,
      pageSize: 20,
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
    this.props.updateBindingData('contestTable', {})
  }

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
              onClick={() => this.handleDetail(record)}
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
    this.props.updateBindingData('contestTable', { data: this.state.value })
  };

  handlePageSizeChange = async (pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('contestTable', { data: this.state.value })
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

  handleFilterChange = (val) => {

  }

  render() {
    const { contestTable } = this.props.bindingData;

    return (
      <div style={styles.container}>
        {/* <IceContainer>
          <FilterTag onChange={this.handleFilterChange} />
          <FilterForm onChange={this.handleFilterChange} />
        </IceContainer> */}
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
            shape="arrow-only"
            pageSizeList={[10, 20, 35]}
            style={styles.pagination}
            total={contestTable.total}
            pageSize={contestTable.pageSize}
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
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};

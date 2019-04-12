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
import produce from 'immer';
import { withRouter } from 'react-router';
import _ from 'lodash';

const Tooltip = Balloon.Tooltip;

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
    value: {
      pageNo: 1,
      pageSize: 20,
      where: {}
    }
  };

  componentDidMount() {
    this.props.updateBindingData('usersTable', {})
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
    this.props.updateBindingData('usersTable', { data: this.state.value })
  };

  handlePageSizeChange = async (pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('usersTable', { data: this.state.value })
  };

  handleFilterTagChange = async (val) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = 1
      state.value.where.level = val
    }))
    console.log(this.state.value, val);
    this.props.updateBindingData('usersTable', { data: this.state.value })
  };

  handleFilterFromChange = async (where) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = 1
      _.assign(state.value.where, where)
    }))
    this.props.updateBindingData('usersTable', { data: this.state.value })
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {

      },
    });
  };

  handleDetail = (record) => {
    this.props.history.push(`/user/${record.id}`)
  };
  handleEdit = (record) => {
    this.props.history.push({ pathname: '/admin/user/create', state: record})
  }
  renderOper = (value, rowIndex, record) => {
    return (
      <Button.Group>
        <Tooltip
          trigger={
            <Button
              type="secondary"
              onClick={() => this.handleDetail(record)}
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
    const color = ['#52c41a','#d9d9d9','#ffc53d','#d3adf7','#adc6ff','#ffec3d']
    return (
      <Tag type="normal" size="small" style={{
        color: `${color[val]}`,
        borderColor: `${color[val]}`,
        backgroundColor: `${color[val]}0F`,
        fontSize: '14px'
      }}>{level[val] || '未知'}</Tag>
    )
  }
  render() {
    const { usersTable } = this.props.bindingData;
    return (
      <div style={styles.container}>
        <IceContainer>
          <FilterTag onChange={this.handleFilterTagChange} />
          <FilterForm onChange={this.handleFilterFromChange} />
        </IceContainer>
        <IceContainer>
          <Pagination
            shape="arrow-only"
            pageSizeList={[10, 20, 35]}
            style={styles.paginationTop}
            total={usersTable.total}
            pageSize={usersTable.pageSize}
            totalRender={total => `总数: ${total}`}
            current={this.state.value.pageNo}
            onChange={this.handlePaginationChange}
            onPageSizeChange={this.handlePageSizeChange}
            pageSizeSelector="filter"
            useFloatLayout
          />
          <Table loading={usersTable.__loading} dataSource={usersTable.items} hasBorder={false}>
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
            shape="arrow-only"
            pageSizeList={[10, 20, 35]}
            style={styles.paginationBottom}
            total={usersTable.total}
            pageSize={usersTable.pageSize}
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

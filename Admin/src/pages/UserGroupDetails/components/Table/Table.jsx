import React, { Component } from 'react';
import {
  Table,
  Button,
  Dialog,
  Icon,
  Balloon,
  Tag
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import api from '../../../../api/api';
import BasicDetailInfo from "../BasicDetailInfo";
import { withRouter } from 'react-router';

const Tooltip = Balloon.Tooltip;

@withRouter
@DataBinder({
  userGroupTable: {
    url: '/user/user-group/list',
    method: 'post',
    data: {
      id: ''
    },
    defaultBindingData: {
      createUser: {},
      createdAt: "",
      desc: null,
      id: "",
      name: "",
      privilege: [],
      users: [],
      applyUsers: [],
    }
  }
}, {requestClient: api})
export default class GoodsTable extends Component {

  componentDidMount() {
    this.props.updateBindingData('userGroupTable', {
      data: {
        id: this.props.match.params.id
      }
    })
  }

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
            <Button type="normal" warning onClick={() => this.handleDelete(record)}>
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
    const { userGroupTable } = this.props.bindingData;
    return (
      <div>
        <BasicDetailInfo dataSource={userGroupTable} />
        <IceContainer>
          <Table loading={ userGroupTable.__loading } dataSource={userGroupTable.users} hasBorder={false}>
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
        </IceContainer>
      </div>
    );
  }
}

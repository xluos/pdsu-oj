
import React, { Component }from 'react';
import { Breadcrumb, Table, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataBinder from '@icedesign/data-binder';
import LevelTag from '../UserList/components/LevelTag';
import api from '../../api/api';
import produce from 'immer';
import './Rank.scss';
import { Message } from '@alifd/next';

const Option = Select.Option;

@DataBinder({
  rankTable: {
    url: '/user/list',
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
export default class Rank extends Component {
  state = {
    value: {
      pageNo: 1,
      pageSize: 20,
      where: {
        mini: true,
        // TODO 暂时无状态
        // status: true,
      },
      // AC数排序
      sort: "accepted_DESC"
    }
  };

  componentDidMount() {
    this.props.updateBindingData('rankTable', { data: this.state.value })
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
    Message.notice('暂不支持分组查询')
  }
  handlePaginationChange = async (pageNo) => {
    await this.setStateAsync(produce(state => {
      state.value.pageNo = pageNo
    }))
    console.log(this.state.value, pageNo);
    this.props.updateBindingData('rankTable', { data: this.state.value })
  };

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  handlePageSizeChange = async (current, pageSize) => {
    await this.setState(produce(state => {
      state.value.pageSize = pageSize
    }))
    console.log(this.state.value, pageSize);
    this.props.updateBindingData('rankTable', { data: this.state.value })
  };
  render () {
    const { rankTable } = this.props.bindingData
    const { pageNo, pageSize } = this.state.value
    const columns = [
      {
        title: "Rank",
        width: 100,
        dataIndex: 'id',
        render: (text, record, index) => (
          index + (pageNo - 1) * pageSize + 1
        )
      },
      {
        title: '名字',
        width: 100,
        dataIndex: 'name',
        render: (text, record) => (
          <Link to={`/user/${record.id}`}>{text}</Link>
        )
      },
      {
        title: '段位',
        width: 100,
        dataIndex: 'level',
        render: (text, record) => LevelTag(record.level)
      },
      {
        title: '格言',
        dataIndex: 'desc',
      },
      {
        title: 'AC',
        width: 100,
        dataIndex: 'accepted',
      },
      {
        title: '通过',
        width: 100,
        dataIndex: 'solved',
      },
      {
        title: '提交',
        width: 100,
        dataIndex: 'submit',
      },
      {
        title: '正确率',
        dataIndex: 'index',
        width: 100,
        render: (text, record) => (
          <span >{record.submit ? (record.solved / record.submit * 100).toFixed(2) : 0}%</span>
        )
      },
    ]
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return (
      <div className="rank-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/rank">Rank</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="rank-content">
          <h3 className="title"><FontAwesomeIcon icon="award" size="1x"/> 排行榜</h3>
          <div className="group">
            <Select
              allowClear
              mode="multiple"
              placeholder="选择排行分组"
              style={{minWidth: "200px"}}
              defaultValue={[]}
              size="large"
              suffixIcon={<Button shape="circle" icon="search" />}
            >
              {children}
            </Select>
            <Button icon="search" size="large" type="primary" onClick={this.handleChange}>查询</Button>
          </div>
          <Table
            loading={rankTable.__loading}
            rowKey="id"
            columns={columns}
            dataSource={rankTable.items}
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSize: rankTable.pageSize,
              current: rankTable.pageNo,
              total: rankTable.total,
              onChange: this.handlePaginationChange,
              onShowSizeChange: this.handlePageSizeChange,
            }}/>
        </div>
      </div>
    );
  }
}


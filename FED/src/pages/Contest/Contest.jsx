
import React, { Component }from 'react';
import { Breadcrumb, Table } from 'antd';
import { Progress } from "@alifd/next";
import { Link } from 'react-router-dom';
import './Contest.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import produce from 'immer';
import api from '../../api/api';
import DataBinder from '@icedesign/data-binder';

import moment from 'moment';
moment.locale('zh-cn');
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
export default class Contest extends Component {
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

  renderBar = (value, record) => {
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

  render () {
    const { contestTable } = this.props.bindingData;
    const columns = [
      {
        title: "ID",
        width: 200,
        dataIndex: 'id',
      },
      {
        title: '比赛',
        dataIndex: 'name',
        render: (text, record) => (
          <Link to={`/contest/${record.id}`}>{text}</Link>
        )
      },
      {
        title: '截止时间',
        dataIndex: 'endTime',
        render: (text, record) => (
          moment(text).format('MM-DD HH:mm')
        )
      },
      {
        title: '比赛进度',
        dataIndex: 'time',
        render: this.renderBar
      },
      {
        title: '类型',
        width: 100,
        dataIndex: 'type',
        render: (text, record) => (
          +text ? '其他' : '公开'
        )
      },
    ]
    return (
      <div className="contest-page page" >
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/contest">Contest</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div className="contest-content">
          <h3 className="title"><FontAwesomeIcon icon={["far", "flag"]} size="1x"/> 比赛列表</h3>
          <Table rowKey="id"
            columns={columns}
            loading={contestTable.__loading}
            dataSource={contestTable.items}
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSize: contestTable.pageSize,
              current: contestTable.pageNo,
              total: contestTable.total,
              onChange: this.handlePaginationChange,
              onShowSizeChange: this.handlePageSizeChange,
            }}
            />
        </div>
      </div>
    );
  }
}

